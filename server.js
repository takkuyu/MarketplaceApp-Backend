const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 

require('dotenv').config(); 

const app = express();
const port = process.env.PORT ||3000;
// const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json()); 

const uri = process.env.ATLAS_URI; 
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection =mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB database connection established successfully');
})

const postingRouter = require('./routes/postings');
const userRouter = require('./routes/users');
const likeRouter = require('./routes/likes');
const loginRouter = require('./routes/login');
// const descriptionRouter = require('./routes/description');

app.use('/postings', postingRouter);
app.use('/users', userRouter);
app.use('/likes', likeRouter);
app.use('/login', loginRouter);
// app.use('/description', loginRouter);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});