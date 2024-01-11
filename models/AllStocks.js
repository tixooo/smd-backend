import mongoose from 'mongoose';

const allStockSchema = new mongoose.Schema({
    MetaData: Object,
    MonthlyTimeSeries: Object,
});

const Stock = mongoose.model('allStocks', allStockSchema);

export default Stock;
