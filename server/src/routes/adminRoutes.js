import { Router } from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import { getAllUsers, deactivateUser, reactivateUser, getPlatformStats } from '../controllers/adminController.js'

const router = Router()

router.use(protect, adminOnly)

router.get('/users', getAllUsers)
router.put('/users/:id/deactivate', deactivateUser)
router.put('/users/:id/reactivate', reactivateUser)
router.get('/stats', getPlatformStats)

export default router
