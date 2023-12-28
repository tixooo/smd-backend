import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    symbol: String,
    name: String,
});

const Stock = mongoose.model('Symbol', stockSchema);

export default Stock;
