const router = require('express').Router();
let Login = require('../models/login.model');

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

    const newLogin = new Login({ username, password});

    newLogin.save()
        .then(() => res.json('New Login !'))
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;