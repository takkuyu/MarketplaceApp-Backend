const router = require('express').Router();
const verify = require('./verifyToken');
const Posting = require('../models/posting.model');

//Get route
router.get('/', verify, (req, res) => {
    Posting.find()
        .then(postings => res.send({ postings: postings, userid: req.user._id }))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get route for one posting
router.get('/:id', verify, (req, res) => {
    Posting.findById(req.params.id) // getting the id dirctly from the URL there
        .then(posting => {
            if (posting === null) {
                res.status(400).json('the post does not exist');
                return
            }
            res.json({ posting: posting, userid: req.user._id })
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


//Post route
router.post('/post', verify, (req, res) => {
    const newPosting = new Posting({
        createdby: req.user._id, // put userid which was returned by jwt payload
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        condition: req.body.condition,
        image: req.body.image,
        description: req.body.description,
        likes: 0,
        comments: []
    });

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
router.post('/update/:id', verify, (req, res) => {
    Posting.findById(req.params.id)
        .then(posting => {
            posting.title = req.body.title;
            posting.location = req.body.location;
            posting.price = req.body.price;
            posting.condition = req.body.condition;
            posting.image = req.body.image;
            posting.description = req.body.description;

            posting.save()
                .then(() => res.json('Posting updated !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Update comments route 
router.post('/update/comments/:id', verify, (req, res) => {
    Posting.findById(req.params.id)
        .then(posting => {
            const comment = {
                author: req.user._id,
                comment: req.body.comment
            }
            posting.comments.push(comment);
            posting.save()
                .then(() => res.json('Comment updated !'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;