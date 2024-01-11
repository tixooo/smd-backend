import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Stock from '../models/Stock.js';
import AllStocks from '../models/AllStocks.js';
import dotenv from 'dotenv';

router.get('/addStock', async (req, res) => {
    try {

        const stockData = await AllStocks.findOne({});


        if (stockData) {
            res.json(stockData);
            console.log(stockData)
        } else {
            res.status(404).send('Stock not found');
            console.log(stockData)
        }
    } catch (e) {
        res.status(500).send(e.message);
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