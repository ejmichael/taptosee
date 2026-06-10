export const notFound = (req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(err)
}

export const errorHandler = (err, req, res, next) => {
  const status = res.statusCode !== 200 ? res.statusCode : 500

  if (process.env.NODE_ENV === 'development') {
    console.error(err)
  }

  res.status(status).json({
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
