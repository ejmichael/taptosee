import mongoose from 'mongoose'

const STALE_INDEXES = ['phoneNumber_1']

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, { dbName: 'taptosee' })
  console.log(`MongoDB connected: ${conn.connection.host}`)

  // Drop legacy indexes that no longer exist in the current schema
  const usersCollection = conn.connection.collection('users')
  for (const name of STALE_INDEXES) {
    try {
      await usersCollection.dropIndex(name)
      console.log(`Dropped stale index: ${name}`)
    } catch {
      // Index doesn't exist — nothing to do
    }
  }
}

export default connectDB
