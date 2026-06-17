import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Custom multer storage engine — pipes directly to Cloudinary v2 upload stream
const cloudinaryStorage = {
  _handleFile(req, file, cb) {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'profile_pictures',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
      },
      (error, result) => {
        if (error) return cb(error)
        cb(null, { path: result.secure_url, filename: result.public_id })
      }
    )
    file.stream.pipe(stream)
  },
  _removeFile(req, file, cb) {
    if (file.filename) {
      cloudinary.uploader.destroy(file.filename, (err) => cb(err))
    } else {
      cb(null)
    }
  },
}

export const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
})

export default cloudinary
