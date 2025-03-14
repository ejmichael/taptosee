const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./src/routes/userRoute');
const dotenv = require('dotenv').config();
const connectToMongoDB = require('./db.js');


const app = express();

connectToMongoDB();

// const allowedOrigins = [
//     "https://taptosee.com", 
//     "https://www.taptosee.me",
//     "https://taptosee.onrender.com"
//   ];
  
//   app.use(
//     cors({
//       origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
//           callback(null, true);
//         } else {
//           callback(new Error("Not allowed by CORS"));
//         }
//       },
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//     })
//   );
app.use(express.json());
app.use(cors())
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