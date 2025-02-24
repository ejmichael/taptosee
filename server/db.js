const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'taptosee' // Specify your database name here
    });
        console.log("Connected to MongoDB, " + `${connect.connection.host}`);
    } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;  