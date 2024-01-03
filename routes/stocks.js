import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Stock from '../models/Stock.js';


router.post('/addStock', async (req, res) => {
    try {
        // TODO to write validations
        const newSymbol = new Stock(req.body);
        await newSymbol.save();
        res.status(201).json({message: 'Stock added successfully'})
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/stocks', async (req, res) => {
    try {
        // TODO to write validations
        const stocks = await Stock.find({})
        console.log('Retrieved stocks:', stocks);
        res.status(200).json({message: 'Stocks retrieved successfully', stocks: stocks});
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

export default router;