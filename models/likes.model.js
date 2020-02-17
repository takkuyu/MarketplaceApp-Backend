const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    likedId: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true
});

const Likes = mongoose.model('Likes', likesSchema);

module.exports = Likes;