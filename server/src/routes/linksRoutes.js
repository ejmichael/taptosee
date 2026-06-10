import { Router } from 'express'
import { body } from 'express-validator'
import { validate } from '../middleware/validate.js'
import { protect } from '../middleware/auth.js'
import { getLinks, addLink, updateLink, deleteLink, reorderLinks, toggleLink } from '../controllers/linksController.js'

const router = Router()

const linkRules = validate([
  body('title').trim().notEmpty().isLength({ max: 100 }).withMessage('Title required (max 100 chars)'),
  body('url').trim().isURL({ require_protocol: true }).withMessage('Valid URL with http/https required'),
])

router.use(protect)

router.get('/', getLinks)
router.post('/', linkRules, addLink)
router.put('/reorder', reorderLinks)
router.put('/:id', updateLink)
router.delete('/:id', deleteLink)
router.post('/:id/toggle', toggleLink)

export default router
