import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    emailAddress: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    displayName: { type: String, trim: true },
    firstName: { type: String, trim: true },
    surname: { type: String, trim: true },
    bio: { type: String, default: '', maxlength: 160 },
    profilePicture: { type: String, default: '' },
    template: { type: String, default: 'template1' },
    customColors: {
      bg: { type: String, default: '' },
      card: { type: String, default: '' },
      button: { type: String, default: '' },
      text: { type: String, default: '' },
    },
    phoneNumber: { type: String },
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    emailVerifyToken: { type: String },
    emailVerifyExpires: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    // Legacy embedded arrays — kept for backward compat, migrated on first login
    links: [{ title: String, url: String }],
    socialMediaLinks: [{ title: String, url: String }],
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password)
}

userSchema.virtual('name').get(function () {
  return this.displayName || `${this.firstName || ''} ${this.surname || ''}`.trim()
})

export default mongoose.model('User', userSchema)
