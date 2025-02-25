const express = require('express');
const { getUserData, createUser, userLogin } = require('../controllers/userController');


const userRoute = express.Router();

userRoute.get('/get-user-data/:username', getUserData)
userRoute.post('/create-user', createUser)
userRoute.post('/user-login', userLogin)


module.exports = userRoute