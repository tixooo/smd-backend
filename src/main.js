import express from 'express';
import connectDB from './db.js';
import authRoute  from '../routes/auth.js'
const app = express();

app.use(express.json())
connectDB().then(() => {
    console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Server is listening on port - 3000');
  })
    app.use('/api/auth', authRoute )
})