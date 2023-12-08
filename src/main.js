import express from 'express';
import connectDB from './db.js';
const main = express();
connectDB().then(() => {
    console.log('Connected to MongoDB');
  main.listen(3000, () => {
    console.log('Server is listening on port - 3000');
  })
})
