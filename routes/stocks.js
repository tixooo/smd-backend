import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Stock from '../models/Stock.js';
import dotenv from 'dotenv';


router.get('/addStock', async (err, res) => {
    try {
        const API_URL = process.env.API_URL;
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.log('Status:', response.status);
            res.status(response.status).json({ message: 'Error fetching data' });
            return;
        }
        const data = await response.json();
        console.log(data);
        res.status(200).json({message: 'Stocks retrieved successfully', allStocks: data});
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ message: 'Internal Server Error'});
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