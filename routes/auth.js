import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

//registration route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword
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
        const user = await User.findOne({ username})
        if(!user){
            return res.status(401).json({message: 'Invalid username or password'});
        }

        //Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
           return res.status(401).json({message: 'Invalid username or password'});
        }
        res.status(200).json({message: 'Login successful'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Internal Server Error'})
    }
})

export default router;