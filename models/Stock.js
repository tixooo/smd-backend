import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    symbol: String,
    name: String,
});

const AllStocks = mongoose.model('allStocks', stockSchema);

export default AllStocks;
