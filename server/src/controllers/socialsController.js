import SocialLink from '../models/SocialLink.js'

// GET /api/v1/socials
export const getSocials = async (req, res) => {
  const socials = await SocialLink.find({ userId: req.user._id }).sort({ order: 1 })
  res.json({ socials })
}

// POST /api/v1/socials
export const addSocial = async (req, res) => {
  const { platform, url } = req.body
  const count = await SocialLink.countDocuments({ userId: req.user._id })

  // Upsert: one entry per platform per user
  const social = await SocialLink.findOneAndUpdate(
    { userId: req.user._id, platform },
    { url, order: count },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )

  res.status(201).json({ social })
}

// PUT /api/v1/socials/:id
export const updateSocial = async (req, res) => {
  const social = await SocialLink.findOne({ _id: req.params.id, userId: req.user._id })
  if (!social) return res.status(404).json({ message: 'Social link not found' })

  const { url } = req.body
  if (url !== undefined) social.url = url

  await social.save()
  res.json({ social })
}

// DELETE /api/v1/socials/:id
export const deleteSocial = async (req, res) => {
  const social = await SocialLink.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
  if (!social) return res.status(404).json({ message: 'Social link not found' })
  res.json({ message: 'Social link removed' })
}

// PUT /api/v1/socials/reorder
export const reorderSocials = async (req, res) => {
  const { order } = req.body
  const ops = order.map(({ id, order: o }) => ({
    updateOne: { filter: { _id: id, userId: req.user._id }, update: { order: o } },
  }))
  await SocialLink.bulkWrite(ops)
  res.json({ message: 'Order updated' })
}
