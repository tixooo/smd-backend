import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    symbolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Symbol'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
