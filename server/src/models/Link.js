import mongoose from 'mongoose'

const linkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    url: { type: String, required: true, trim: true },
    icon: { type: String, default: 'globe' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

linkSchema.index({ userId: 1, order: 1 })

export default mongoose.model('Link', linkSchema)
