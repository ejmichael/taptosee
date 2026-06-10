import mongoose from 'mongoose'

const linkClickSchema = new mongoose.Schema({
  linkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Link', required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  referrer: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
})

linkClickSchema.index({ userId: 1, timestamp: -1 })
linkClickSchema.index({ linkId: 1, timestamp: -1 })

export default mongoose.model('LinkClick', linkClickSchema)
