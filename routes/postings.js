const router = require('express').Router();
let Posting = require('../models/posting.model');

//Get route
router.route('/').get((req, res) => {
    Posting.find()
        .then(postings => res.json(postings))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get route for one posting
router.route('/:id').get((req, res) => { // 
    Posting.findById(req.params.id) // getting the id dirctly from the URL there
        .then(posting => res.json(posting))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Post route
router.route('/post').post((req, res) => {

    const createdby = req.body.createdby;
    const profilePic = req.body.profilePic;
    const title = req.body.title;
    const location = req.body.location;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const likes = 0;
    const comments = [];

    const newPosting = new Posting({ createdby, profilePic, title, location, price, image, description, likes, comments });

    newPosting.save()
        .then(() => res.json('Created a posting !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Delete route
router.route('/:id').delete((req, res) => {
    Posting.findByIdAndDelete(req.params.id)
        .then(() => res.json('Posting deleted !'))
        .catch(err => res.status(400).json('Error: ' + err));
});


//Update route
router.route('/update/:id').post((req, res) => {
    Posting.findById(req.params.id)
        .then(posting => {
            posting.title = req.body.title;
            posting.location = req.body.location;
            posting.price = req.body.price;
            posting.image = req.body.image;
            posting.description = req.body.description;

            posting.save()
                .then(() => res.json('Posting updated !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Update comments route 
router.route('/update/comments/:id').post((req, res) => {
    Posting.findById(req.params.id)
        .then(posting => {

            const author = req.body.author;
            const newcomment = req.body.comment;
            const comment = {
                author: author,
                comment: newcomment
            }
            posting.comments.push(comment);
            posting.save()
                .then(() => res.json('Comment updated !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;