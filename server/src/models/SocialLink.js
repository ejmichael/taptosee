import mongoose from 'mongoose'

const PLATFORMS = ['youtube', 'instagram', 'twitter', 'linkedin', 'tiktok', 'facebook', 'website', 'github', 'twitch', 'discord', 'snapchat', 'pinterest']

const socialLinkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    platform: { type: String, required: true, enum: PLATFORMS },
    url: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

socialLinkSchema.index({ userId: 1, order: 1 })

export default mongoose.model('SocialLink', socialLinkSchema)
