const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel') 





// Create User
const createUser = async (req, res) => {
    try {

        // Destructure fields from req.body (after multer has parsed the form data)
        const { firstName, surname, username, emailAddress, phoneNumber, profilePicture, password, bio, links, socialMediaLinks } = req.body;


        // Check required fields
        if (!firstName || !surname || !emailAddress || !phoneNumber || !password) {
            return res.status(400).json({ message: 'Please enter all the required fields.' });
        }


        // Check if user already exists
        const userExists = await User.findOne({ email: emailAddress });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPW = await bcrypt.hash(password, salt);

        // Create new user object
        const newUser = new User({
            firstName,
            surname,
            username,
            emailAddress,
            password: hashedPW,
            phoneNumber,
            bio,
            profilePicture,
            links,  // Parse links array
            socialMediaLinks,  // Parse social media links
        });

        // Save user to the database
        await newUser.save();

        // Send the response after successful registration
        res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

  
const getUserData = async (req, res) => {
    const { username } = req.params;
    
    const user = await User.findOne({ username: username })

    if(!user){
        res.status(400).json({ message: 'User not found' });
    }
    
    res.status(201).json({ message: 'Retrieved User data successfully', user })
}

const userLogin = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        // Incorrect credentials
        res.status(400).json({ message: 'User not found' });
    }

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            token: generateToken(user._id),
        })
    }

    if(!(await bcrypt.compare(password, user.password))) {
        // Incorrect credentials
        res.status(400).json({ message: 'Invalid user credentials' });
    }
}

//generate token 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    userLogin,
    createUser,
    getUserData
}