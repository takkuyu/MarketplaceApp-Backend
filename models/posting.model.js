const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postingSchema = new Schema({
    createdby: { type: String },
    profilePic: { type: String },
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    liked: { type: Number },
    comments: { type: Array },
}, {
    timestamps: true
});

const Posting = mongoose.model('Posting', postingSchema);

module.exports = Posting;