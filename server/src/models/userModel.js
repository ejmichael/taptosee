const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    isAdmin:{
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'No bio yet'
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: [true, "Please enter a valid email address."],
        unique: true
    },
    phoneNumber:{
        type: String,
        required: [true, "Please enter a valid phone number."],
        unique: true
    },
    password: {
        type: String,
    },
    clickCount: { type: Number, default: 0 },
    links: [
        {
          title: { type: String, required: true },
          url: { type: String, required: true }
        }
      ],
      socialMediaLinks: [
        {
          title: { type: String, required: true },
          url: { type: String, required: true }
        }
      ],
      profilePicture:{
        type: String,
      },
      template: {
        type: String,
        default: "template1"
      }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)


