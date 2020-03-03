// require('dotenv').config();

const router = require('express').Router();
let Login = require('../models/login.model');
// const jwt = require('jsonwebtoken');


//Get route
router.route('/').get((req, res) => {
    Login.find()
        .then(login => res.json(login))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Post route
router.route('/post').post((req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const newLogin = new Login({ username, password });
    // const user = { name: username, password: password }

    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    newLogin.save()
        .then(() => res.json('New Login !'))
        .catch(err => res.status(400).json('Error: ' + err));
        // .then(() => res.json({ accessToken: accessToken }));
});



module.exports = router;