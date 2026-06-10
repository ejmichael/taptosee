import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' })

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id).select('-password -emailVerifyToken -resetPasswordToken')
  if (!req.user) return res.status(401).json({ message: 'User not found' })
  next()
}

export const adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin) return res.status(403).json({ message: 'Admin access required' })
  next()
}
