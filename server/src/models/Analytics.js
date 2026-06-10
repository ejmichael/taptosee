import mongoose from 'mongoose'

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  views: { type: Number, default: 0 },
  uniqueViews: { type: Number, default: 0 },
  visitorIps: [{ type: String }],
})

analyticsSchema.index({ userId: 1, date: 1 }, { unique: true })

export default mongoose.model('Analytics', analyticsSchema)
