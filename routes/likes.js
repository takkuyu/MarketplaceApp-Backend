const router = require('express').Router();
let Likes = require('../models/likes.model');

//Get route
router.route('/').get((req, res) => {
    Likes.find()
        .then(Likes => res.json(Likes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/isLiked').post((req, res) => { 
    const likedId = req.body.likedId;

    Likes.findOne( {likedId} )
        .then((like) => {
            if (like) { // when successfully found one , otherwise it gives a null.
                res.json(like);
            } else {
                res.json(null);
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// get an id for the image url
router.route('/image').post((req, res) => {

    const image = req.body.image;

    Likes.findOne({ image })

        .then((data) => {
            if (data) { // when successfully found one , otherwise it gives a false.
                res.json(data._id);
            } else {
                res.json(false);
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));

});


//Post route
router.route('/post').post((req, res) => {

    const likedId = req.body.likedId;
    const title = req.body.title;
    const location = req.body.location;
    const price = req.body.price;
    const image = req.body.image;

    const newLike = new Likes({ likedId, title, location, price, image });

    newLike.save()
        .then(() => res.json('Created a Like !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete route
router.route('/:id').delete((req, res) => {

    Likes.findByIdAndDelete(req.params.id)
        .then(() => res.json('Likes deleted !'))
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;