const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./src/routes/userRoute');
const dotenv = require('dotenv').config();
const connectToMongoDB = require('./db.js');


const app = express();

connectToMongoDB();

// app.use(cors({ 
//     origin: "http://localhost:3000"
//   }));
  app.use(cors({ 
      origin: "https://taptosee.com"
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Routes
app.get('/', (req, res) => {
    res.send("Home Route");
});

app.use('/api/user', userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});