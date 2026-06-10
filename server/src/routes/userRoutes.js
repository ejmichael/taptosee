import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'
import { upload } from '../config/cloudinary.js'
import { getPublicProfile, updateProfile, updateUsername, deleteAccount } from '../controllers/userController.js'

const router = Router()

router.get('/:username', getPublicProfile)
router.put('/profile', protect, upload.single('profilePicture'), updateProfile)
router.put('/username', protect, validate([
  body('username').trim().isLength({ min: 3, max: 30 }).matches(/^[a-zA-Z0-9_]+$/),
]), updateUsername)
router.delete('/account', protect, validate([
  body('password').notEmpty().withMessage('Password required to delete account'),
]), deleteAccount)

export default router
