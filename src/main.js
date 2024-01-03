import express from 'express';
import connectDB from './db.js';
import authRoute  from '../routes/auth.js'
import cors from 'cors';
import corsOptions from '../routes/cors.js';
import auth from "../routes/auth.js";
import stocks from "../routes/stocks.js"
const app = express();


app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    next();
});
app.use('/public', express.static('public'))
app.use('api', auth)
app.use(express.json())
app.use(cors(corsOptions))
connectDB().then(() => {
    console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Server is listening on port - 3000');
  })
    app.use('/api/auth', authRoute )
    app.use('/api/data', stocks)
})