import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Symbol'}],
    image: {type: String, required: false},
})

const User = mongoose.model('User', userSchema, 'SMD-accounts');

export default User