import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimiter.js'
import { upload } from '../config/cloudinary.js'
import {
  register, login, logout, getMe,
  verifyEmail, forgotPassword, resetPassword, changePassword,
} from '../controllers/authController.js'

const router = Router()

const registerRules = validate([
  body('username').trim().isLength({ min: 3, max: 30 }).matches(/^[a-zA-Z0-9_]+$/).withMessage('Username must be 3-30 chars, letters/numbers/underscores only'),
  body('emailAddress').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').trim().notEmpty().withMessage('First name required'),
  body('surname').trim().notEmpty().withMessage('Surname required'),
])

const loginRules = validate([
  body('emailAddress').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
])

router.post('/register', authLimiter, upload.single('profilePicture'), registerRules, register)
router.post('/login', authLimiter, loginRules, login)
router.post('/logout', logout)
router.get('/me', protect, getMe)
router.get('/verify-email', verifyEmail)
router.post('/forgot-password', authLimiter, forgotPassword)
router.post('/reset-password', validate([
  body('token').notEmpty(),
  body('password').isLength({ min: 6 }),
]), resetPassword)
router.post('/change-password', protect, validate([
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 }),
]), changePassword)

export default router
