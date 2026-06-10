import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import connectDB from './src/config/db.js'
import { notFound, errorHandler } from './src/middleware/errorHandler.js'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import linksRoutes from './src/routes/linksRoutes.js'
import socialsRoutes from './src/routes/socialsRoutes.js'
import analyticsRoutes from './src/routes/analyticsRoutes.js'
import adminRoutes from './src/routes/adminRoutes.js'

await connectDB()

const app = express()

app.set('trust proxy', 1)

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

const prodOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (server-to-server, curl, Postman)
    if (!origin) return cb(null, true)
    // In dev: allow any localhost port
    if (process.env.NODE_ENV !== 'production' && /^http:\/\/localhost:\d+$/.test(origin)) {
      return cb(null, true)
    }
    // In prod: check whitelist
    if (prodOrigins.includes(origin)) return cb(null, true)
    cb(null, false)
  },
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/links', linksRoutes)
app.use('/api/v1/socials', socialsRoutes)
app.use('/api/v1/analytics', analyticsRoutes)
app.use('/api/v1/admin', adminRoutes)

app.get('/api/v1/health', (req, res) => res.json({ status: 'ok' }))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV}]`))
