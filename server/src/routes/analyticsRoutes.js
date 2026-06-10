import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import { apiLimiter } from '../middleware/rateLimiter.js'
import { recordView, recordClick, getAnalytics } from '../controllers/analyticsController.js'

const router = Router()

router.post('/view', apiLimiter, recordView)
router.post('/click/:linkId', apiLimiter, recordClick)
router.get('/', protect, getAnalytics)

export default router
