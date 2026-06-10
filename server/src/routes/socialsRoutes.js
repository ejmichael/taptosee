import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'
import { getSocials, addSocial, updateSocial, deleteSocial, reorderSocials } from '../controllers/socialsController.js'

const PLATFORMS = ['youtube', 'instagram', 'twitter', 'linkedin', 'tiktok', 'facebook', 'website', 'github', 'twitch', 'discord', 'snapchat', 'pinterest']

const router = Router()
router.use(protect)

router.get('/', getSocials)
router.post('/', validate([
  body('platform').isIn(PLATFORMS).withMessage('Invalid platform'),
  body('url').trim().isURL({ require_protocol: true }).withMessage('Valid URL required'),
]), addSocial)
router.put('/reorder', reorderSocials)
router.put('/:id', validate([body('url').trim().isURL({ require_protocol: true })]), updateSocial)
router.delete('/:id', deleteSocial)

export default router
