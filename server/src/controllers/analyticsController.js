import Analytics from '../models/Analytics.js'
import LinkClick from '../models/LinkClick.js'
import Link from '../models/Link.js'

const todayStr = () => new Date().toISOString().split('T')[0]

// POST /api/v1/analytics/view/:username  (public, called from profile page)
export const recordView = async (req, res) => {
  const { userId } = req.body
  if (!userId) return res.status(400).json({ message: 'userId required' })

  const ip = req.ip || req.headers['x-forwarded-for']?.split(',')[0] || 'unknown'
  const date = todayStr()

  const doc = await Analytics.findOneAndUpdate(
    { userId, date },
    { $inc: { views: 1 } },
    { upsert: true, new: true }
  )

  // Count as unique if IP hasn't visited today
  if (!doc.visitorIps.includes(ip)) {
    await Analytics.updateOne({ userId, date }, {
      $inc: { uniqueViews: 1 },
      $push: { visitorIps: ip },
    })
  }

  res.json({ recorded: true })
}

// POST /api/v1/analytics/click/:linkId  (public)
export const recordClick = async (req, res) => {
  const link = await Link.findById(req.params.linkId)
  if (!link) return res.status(404).json({ message: 'Link not found' })

  const referrer = req.headers.referer || req.body.referrer || ''

  await Promise.all([
    LinkClick.create({ linkId: link._id, userId: link.userId, referrer }),
    Link.findByIdAndUpdate(link._id, { $inc: { clickCount: 1 } }),
  ])

  res.json({ recorded: true })
}

// GET /api/v1/analytics  (protected)
export const getAnalytics = async (req, res) => {
  const days = Number(req.query.days) || 30
  const since = new Date()
  since.setDate(since.getDate() - days)
  const sinceStr = since.toISOString().split('T')[0]

  const [viewData, links, recentClicks] = await Promise.all([
    Analytics.find({
      userId: req.user._id,
      date: { $gte: sinceStr },
    }).sort({ date: 1 }).select('date views uniqueViews -_id'),

    Link.find({ userId: req.user._id }).select('title clickCount isActive'),

    LinkClick.aggregate([
      { $match: { userId: req.user._id, timestamp: { $gte: since } } },
      { $group: { _id: '$referrer', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
  ])

  const totalViews = viewData.reduce((sum, d) => sum + d.views, 0)
  const totalClicks = links.reduce((sum, l) => sum + l.clickCount, 0)

  res.json({
    views: viewData,
    links,
    topReferrers: recentClicks.map((r) => ({ referrer: r._id || 'Direct', count: r.count })),
    totals: { views: totalViews, clicks: totalClicks },
  })
}
