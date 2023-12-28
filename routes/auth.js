import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Stock from '../models/Stock.js';

//registration route
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, fullName} = req.body;

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
        const hashedEmail = await bcrypt.hash(email, salt);

        // Create a new user
        const newUser = new User({
            username: username,
            fullName: fullName,
            password: hashedPassword,
            email: hashedEmail
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
        const { username, password, email} = req.body;
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

        //Check if email is correct
        const isEmailValid = await bcrypt.compare(email, user.email)
        if(!isEmailValid){
           return res.status(401).json({message: `Invalid email`});
        }
        res.status(200).json({message: 'Login successful'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Internal Server Error'})
    }
})

router.post('/addStock', async (req, res) => {
    try {
        const newSymbol = new Stock(req.body);
        await newSymbol.save();
        res.status(201).json(newSymbol).json({ message: 'Symbol added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/stocks', async (req, res) => {
    try {
        const symbols = await Symbol.find({}); // Fetch all symbols
        res.status(200).json(symbols).json({ message: 'All symbols are here' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;