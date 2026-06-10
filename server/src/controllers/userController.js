import User from '../models/User.js'
import Link from '../models/Link.js'
import SocialLink from '../models/SocialLink.js'
import cloudinary from '../config/cloudinary.js'

// GET /api/v1/users/:username  (public)
export const getPublicProfile = async (req, res) => {
  const user = await User.findOne({
    username: req.params.username.toLowerCase(),
    isActive: true,
  }).select('-password -emailVerifyToken -resetPasswordToken -emailVerifyExpires -resetPasswordExpires -phoneNumber')

  if (!user) return res.status(404).json({ message: 'Profile not found' })

  const [links, socials] = await Promise.all([
    Link.find({ userId: user._id, isActive: true }).sort({ order: 1 }),
    SocialLink.find({ userId: user._id }).sort({ order: 1 }),
  ])

  res.json({ user, links, socials })
}

// PUT /api/v1/users/profile
export const updateProfile = async (req, res) => {
  const { displayName, bio, template, customColors } = req.body
  const user = req.user

  if (displayName !== undefined) user.displayName = displayName
  if (bio !== undefined) user.bio = bio
  if (template !== undefined) user.template = template
  if (customColors !== undefined) user.customColors = { ...user.customColors?.toObject?.() || {}, ...customColors }

  if (req.file?.path) {
    if (user.profilePicture) {
      const parts = user.profilePicture.split('/')
      const publicId = `profile_pictures/${parts[parts.length - 1].split('.')[0]}`
      await cloudinary.uploader.destroy(publicId).catch(() => {})
    }
    user.profilePicture = req.file.path
  }

  await user.save()
  res.json({ user: sanitizeUser(user) })
}

// PUT /api/v1/users/username
export const updateUsername = async (req, res) => {
  const { username } = req.body
  const taken = await User.findOne({ username: username.toLowerCase(), _id: { $ne: req.user._id } })
  if (taken) return res.status(409).json({ message: 'Username already taken' })

  req.user.username = username.toLowerCase()
  await req.user.save()
  res.json({ username: req.user.username })
}

// DELETE /api/v1/users/account
export const deleteAccount = async (req, res) => {
  const { password } = req.body
  const user = await User.findById(req.user._id)

  const match = await user.matchPassword(password)
  if (!match) return res.status(401).json({ message: 'Incorrect password' })

  await Promise.all([
    Link.deleteMany({ userId: user._id }),
    SocialLink.deleteMany({ userId: user._id }),
    User.findByIdAndDelete(user._id),
  ])

  res.clearCookie('token')
  res.json({ message: 'Account deleted' })
}

const sanitizeUser = (user) => ({
  _id: user._id,
  username: user.username,
  emailAddress: user.emailAddress,
  displayName: user.displayName,
  firstName: user.firstName,
  surname: user.surname,
  bio: user.bio,
  profilePicture: user.profilePicture,
  template: user.template,
  customColors: user.customColors,
  isAdmin: user.isAdmin,
  isVerified: user.isVerified,
  createdAt: user.createdAt,
})
