import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import Stock from '../models/Stock.js';
import AllStocks from '../models/AllStocks.js';
import dotenv from 'dotenv';
import axios from 'axios';

router.get('/addStock', async (req, res) => {
    try {
        const symbol = req.query.symbol;
        if (!symbol) {
            return res.status(400).send('Symbol is required');
        }

        const finnhubResponse = await axios.get(process.env.STOCK_API_BASE_URL + process.env.STOCK_API_KEY);
        res.json(finnhubResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving stock quote');
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