import Link from '../models/Link.js'

// GET /api/v1/links
export const getLinks = async (req, res) => {
  const links = await Link.find({ userId: req.user._id }).sort({ order: 1 })
  res.json({ links })
}

// POST /api/v1/links
export const addLink = async (req, res) => {
  const { title, url, icon } = req.body
  const count = await Link.countDocuments({ userId: req.user._id })

  const link = await Link.create({
    userId: req.user._id,
    title,
    url,
    icon: icon || 'globe',
    order: count,
  })

  res.status(201).json({ link })
}

// PUT /api/v1/links/:id
export const updateLink = async (req, res) => {
  const link = await Link.findOne({ _id: req.params.id, userId: req.user._id })
  if (!link) return res.status(404).json({ message: 'Link not found' })

  const { title, url, icon, isActive } = req.body
  if (title !== undefined) link.title = title
  if (url !== undefined) link.url = url
  if (icon !== undefined) link.icon = icon
  if (isActive !== undefined) link.isActive = isActive

  await link.save()
  res.json({ link })
}

// DELETE /api/v1/links/:id
export const deleteLink = async (req, res) => {
  const link = await Link.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
  if (!link) return res.status(404).json({ message: 'Link not found' })
  res.json({ message: 'Link deleted' })
}

// PUT /api/v1/links/reorder
export const reorderLinks = async (req, res) => {
  const { order } = req.body // array of { id, order }
  const ops = order.map(({ id, order: o }) => ({
    updateOne: { filter: { _id: id, userId: req.user._id }, update: { order: o } },
  }))
  await Link.bulkWrite(ops)
  res.json({ message: 'Order updated' })
}

// POST /api/v1/links/:id/toggle
export const toggleLink = async (req, res) => {
  const link = await Link.findOne({ _id: req.params.id, userId: req.user._id })
  if (!link) return res.status(404).json({ message: 'Link not found' })
  link.isActive = !link.isActive
  await link.save()
  res.json({ link })
}
