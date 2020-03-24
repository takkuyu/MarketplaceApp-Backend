const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))// get users from the db and return them in JSON format
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Public 
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST api/profile/me
// @desc   Edit current users profile
// @access Public 
router.route('/edit/:id').post((req, res) => {

    const newName = req.body.newName;
    const newEmail = req.body.newEmail;
    const newPic = req.body.newPic;

    User.findById(req.params.id)
        .then(user => {
            user.username = newName;
            user.email = newEmail;
            user.picture = newPic;
            user.save()
                .then(() => res.json('Edit user profile !'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route  POST api/profile/me
// @desc   Check if the post is already liked
// @access Public 
router.route('/checkLiked/:id').post((req, res) => {

    const postingId = req.params.id;
    const userId = req.body.userId;

    User.findById(userId)
        .then(user => {

            const result = user.favorites.filter(favorite => favorite == postingId)

            if (result.length > 0) {
                res.json(true)
            } else {
                res.json(false)
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/register').post((req, res) => {

    const newUser = new User({
        picture: req.body.picture,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

    });

    newUser.save()
        .then((newuser) => res.json(newuser._id))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/signin').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email, password })
        .then((user) => {
            if (user) { // when successfully found one user, otherwise it gives a null.
                req.session.user_id = user._id;
                res.json(req.session.user_id);
            } else {
                res.end();
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

//Delete route 
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST route, delete liked posting  
router.route('/deleteLike/:id').post((req, res) => {

    User.findById(req.params.id)
        .then((user) => {

            const deleteId = req.body.deleteId;
            const newArray = user.favorites.filter(n => n !== deleteId);

            user.favorites = newArray;

            user.save()
                .then(() => res.json('Delete Like !'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST route, delete like when it is deleted by user  
router.route('/deleteLikeFromAll').post((req, res) => {

    const deletedId = req.body.deletedId;

    User.find({ favorites: deletedId })
        .then((users) => {

            // result will be empty array (len = 0) when there's no user found with the id
            if (users.length == 0) {
                res.json('zero user !')
                return
            }

            users.forEach(user => {
                // console.log('original : ' + user.favorites);
                const newArray = user.favorites.filter(id => id !== deletedId);
                // console.log('new array : ' + newArray);
                user.favorites = newArray;
                user.save();
            })
            res.json('success !')
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//POST for Favorites 
router.route('/favorite/:id').post((req, res) => {

    User.findById(req.params.id)
        .then((user) => {

            const favoriteId = req.body.favoriteId;

            user.favorites.push(favoriteId);
            user.save()
                .then(() => res.json('Added to Favorite !'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;