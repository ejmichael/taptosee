import crypto from 'crypto'
import User from '../models/User.js'
import Link from '../models/Link.js'
import SocialLink from '../models/SocialLink.js'
import { generateToken, clearToken } from '../utils/generateToken.js'
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/email.js'

// Migrate old embedded links to new collections (runs once on first login after rebuild)
const migrateLegacyData = async (user) => {
  const hasPendingLinks = user.links?.length > 0
  const hasPendingSocials = user.socialMediaLinks?.length > 0
  if (!hasPendingLinks && !hasPendingSocials) return

  if (hasPendingLinks) {
    const existing = await Link.countDocuments({ userId: user._id })
    if (existing === 0) {
      const docs = user.links.map((l, i) => ({
        userId: user._id,
        title: l.title,
        url: l.url,
        order: i,
        isActive: true,
      }))
      await Link.insertMany(docs)
    }
    user.links = []
  }

  if (hasPendingSocials) {
    const existing = await SocialLink.countDocuments({ userId: user._id })
    if (existing === 0) {
      const platformMap = {
        youtube: 'youtube', instagram: 'instagram', twitter: 'twitter',
        linkedin: 'linkedin', tiktok: 'tiktok', facebook: 'facebook',
      }
      const docs = user.socialMediaLinks
        .map((s, i) => {
          const platform = Object.keys(platformMap).find(k => s.title?.toLowerCase().includes(k)) || 'website'
          return { userId: user._id, platform, url: s.url, order: i }
        })
      await SocialLink.insertMany(docs)
    }
    user.socialMediaLinks = []
  }

  await user.save()
}

const sanitizeUser = (user) => ({
  _id: user._id,
  username: user.username,
  emailAddress: user.emailAddress,
  displayName: user.displayName || `${user.firstName || ''} ${user.surname || ''}`.trim(),
  firstName: user.firstName,
  surname: user.surname,
  bio: user.bio,
  profilePicture: user.profilePicture,
  template: user.template,
  customColors: user.customColors,
  isAdmin: user.isAdmin,
  isVerified: user.isVerified,
  isActive: user.isActive,
  createdAt: user.createdAt,
})

// POST /api/v1/auth/register
export const register = async (req, res) => {
  const { username, emailAddress, password, firstName, surname, bio, template } = req.body

  const [usernameTaken, emailTaken] = await Promise.all([
    User.findOne({ username: username.toLowerCase() }),
    User.findOne({ emailAddress: emailAddress.toLowerCase() }),
  ])

  if (usernameTaken) return res.status(409).json({ message: 'Username already taken' })
  if (emailTaken) return res.status(409).json({ message: 'Email already registered' })

  const verifyToken = crypto.randomBytes(32).toString('hex')
  const profilePicture = req.file?.path || ''

  const user = await User.create({
    username: username.toLowerCase(),
    emailAddress: emailAddress.toLowerCase(),
    password,
    firstName,
    surname,
    displayName: `${firstName} ${surname}`.trim(),
    bio: bio || '',
    profilePicture,
    template: template || 'template1',
    emailVerifyToken: verifyToken,
    emailVerifyExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  })

  await sendVerificationEmail(user.emailAddress, verifyToken)
  generateToken(res, user._id)

  res.status(201).json({ user: sanitizeUser(user) })
}

// POST /api/v1/auth/login
export const login = async (req, res) => {
  const { emailAddress, password } = req.body

  const user = await User.findOne({ emailAddress: emailAddress.toLowerCase() })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  if (!user.isActive) return res.status(403).json({ message: 'Account deactivated. Contact support.' })

  const match = await user.matchPassword(password)
  if (!match) return res.status(401).json({ message: 'Invalid credentials' })

  await migrateLegacyData(user)
  generateToken(res, user._id)

  res.json({ user: sanitizeUser(user) })
}

// POST /api/v1/auth/logout
export const logout = (req, res) => {
  clearToken(res)
  res.json({ message: 'Logged out' })
}

// GET /api/v1/auth/me
export const getMe = (req, res) => {
  res.json({ user: sanitizeUser(req.user) })
}

// GET /api/v1/auth/verify-email
export const verifyEmail = async (req, res) => {
  const { token } = req.query
  if (!token) return res.status(400).json({ message: 'Token required' })

  const user = await User.findOne({
    emailVerifyToken: token,
    emailVerifyExpires: { $gt: Date.now() },
  })

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' })

  user.isVerified = true
  user.emailVerifyToken = undefined
  user.emailVerifyExpires = undefined
  await user.save()

  res.json({ message: 'Email verified successfully' })
}

// POST /api/v1/auth/forgot-password
export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ emailAddress: req.body.emailAddress?.toLowerCase() })

  // Always respond 200 to prevent email enumeration
  if (!user) return res.json({ message: 'If that email exists, a reset link has been sent' })

  const token = crypto.randomBytes(32).toString('hex')
  user.resetPasswordToken = token
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000)
  await user.save()

  await sendPasswordResetEmail(user.emailAddress, token)

  res.json({ message: 'If that email exists, a reset link has been sent' })
}

// POST /api/v1/auth/reset-password
export const resetPassword = async (req, res) => {
  const { token, password } = req.body

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  })

  if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' })

  user.password = password
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  await user.save()

  generateToken(res, user._id)
  res.json({ message: 'Password reset successful', user: sanitizeUser(user) })
}

// POST /api/v1/auth/change-password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body
  const user = await User.findById(req.user._id)

  const match = await user.matchPassword(currentPassword)
  if (!match) return res.status(401).json({ message: 'Current password is incorrect' })

  user.password = newPassword
  await user.save()

  res.json({ message: 'Password updated' })
}
