import mongoose from 'mongoose';

const allStockSchema = new mongoose.Schema({
    MetaData: Object,
    MonthlyTimeSeries: Object,
});

const Stock = mongoose.model('Symbol', allStockSchema);

export default Stock;
