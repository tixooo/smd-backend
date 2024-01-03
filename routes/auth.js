import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

//registration route
router.post('/register', async (req, res) => {
    const { username, password, email, fullName, image} = req.body;
    try {
        //check if user already exists
        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }
        //check if email already exists
        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({message: 'Email already exists'});
        }

        // Hash the password and email
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username: username,
            fullName: fullName,
            password: hashedPassword,
            email: email,
            image: image
        })

        //Save the user to the database
        await newUser.save()

        res.status(201).json({message: 'User registered successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Internal Server Error'})
    }
})

//Login
router.post('/login', async (req, res) => {
    try {
        const { username, password} = req.body;
        //Check if user exists
        const user = await User.findOne({username})
        if(!user){
            return res.status(401).json({message: `Invalid username or password`});
        }

        //Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
           return res.status(401).json({message: `Invalid username or password`})
        }

        const userData = {
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            // TODO to think about the password part maybe so the frontend can modify it and change it possibly
        };
        res.status(200).json({message: 'Login successful', user: userData})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Internal Server Error'})
    }
})

export default router;