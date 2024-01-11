import mongoose from 'mongoose';

const allStockSchema = new mongoose.Schema({
    MetaData: Object,
    MonthlyTimeSeries: Object,
});

const AllStock = mongoose.model('API', allStockSchema);

export default AllStock;
