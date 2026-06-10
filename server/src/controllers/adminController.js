import User from '../models/User.js'
import Link from '../models/Link.js'
import Analytics from '../models/Analytics.js'
import LinkClick from '../models/LinkClick.js'

// GET /api/v1/admin/users
export const getAllUsers = async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20
  const search = req.query.search || ''

  const query = search
    ? { $or: [{ username: { $regex: search, $options: 'i' } }, { emailAddress: { $regex: search, $options: 'i' } }] }
    : {}

  const [users, total] = await Promise.all([
    User.find(query)
      .select('-password -emailVerifyToken -resetPasswordToken')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    User.countDocuments(query),
  ])

  res.json({ users, total, page, pages: Math.ceil(total / limit) })
}

// PUT /api/v1/admin/users/:id/deactivate
export const deactivateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  ).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json({ user })
}

// PUT /api/v1/admin/users/:id/reactivate
export const reactivateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    { new: true }
  ).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json({ user })
}

// GET /api/v1/admin/stats
export const getPlatformStats = async (req, res) => {
  const todayStr = new Date().toISOString().split('T')[0]
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [
    totalUsers,
    activeUsers,
    totalLinks,
    totalViewsResult,
    totalClicksResult,
    recentSignups,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ isActive: true }),
    Link.countDocuments(),
    Analytics.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
    LinkClick.countDocuments(),
    User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
  ])

  res.json({
    totalUsers,
    activeUsers,
    totalLinks,
    totalViews: totalViewsResult[0]?.total || 0,
    totalClicks: totalClicksResult,
    recentSignups,
  })
}
