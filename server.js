const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const postingRouter = require('./routes/postings');
const userRouter = require('./routes/users');
// const session = require('express-session');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());
// app.use(session({ 
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }));

//Connect to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});


//Route Middleware
app.use('/postings', postingRouter);
app.use('/users', userRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});