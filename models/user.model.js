const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    picture:{
        type: String, // some validations
        required: true,
    },
    username:{
        type: String, // some validations
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String, // some validations
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    password:{
        type:String,
        required: true,
        trim: true,
        minlength: 5
    },
    favorites:{
        type:Array,
    }
},{
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;