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
        const allStocks = await Stock.find({})
        res.status(200).json({message: 'Stocks retrieved successfully', allStocks: allStocks});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

export default router;