import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Stock from '../models/Stock.js';
import dotenv from 'dotenv';


router.get('/addStock', async (err, res, data) => {
    try {
        // write a connection to the API from .env
        const API_URL = process.env.API_URL;
        // we need to connect to that URL
        const response = await fetch(API_URL);
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            // data is successfully parsed as a JSON object:
            console.log(data);
            console.log(response)
            res.status(200).json({message: 'Stocks retrieved successfully', allStocks: data});
        }
    } catch (error) {
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