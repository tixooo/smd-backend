import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    symbol: String,
    name: String,
});

const stock = mongoose.model('Symbol', stockSchema);

export default stock;
