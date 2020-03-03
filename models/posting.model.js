const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postingSchema = new Schema({
    createdby: { type: String, required: true },
    profilePic: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    condition: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    liked: { type: Number },
    comments: { type: Array },
}, {
    timestamps: true
});

const Posting = mongoose.model('Posting', postingSchema);

module.exports = Posting;