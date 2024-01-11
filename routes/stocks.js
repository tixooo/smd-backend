import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Stock from '../models/Stock.js';
import dotenv from 'dotenv';


// router.get('/addStock', async (req, res) => {
//     try {
//         const symbol = req.query.symbol;
//         const API_BASE_URL = process.env.STOCK_API_BASE_URL;
//         const API_KEY = process.env.STOCK_API_KEY;
//         const apiUrl = `${API_BASE_URL}&symbol=${symbol}&apikey=${API_KEY}`;
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//             res.status(response.status).json({ message: 'Error fetching data' });
//             return;
//         }
//         const data = await response.json();
//         res.status(200).json({message: 'Stocks retrieved successfully', allStocks: data});
//     } catch (error) {
//         console.error('Error fetching stocks:', error);
//         res.status(500).json({ message: 'Internal Server Error'});
//     }
// });
router.get('/addStock', async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const collection = client.db("Cluster0").collection("API");

        // const query = { "MetaData.2. Symbol": symbol };
        //testing
        const stockData = await collection.findOne({});

        if (stockData) {
            res.json(stockData);
        } else {
            res.status(404).send('Stock not found');
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