const router = require('express').Router();
const Post = require('../models/Post')
const bodyParser = require('body-parser');
const isAuthorised = require('./middleware')
// Your routing code goes here

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.post('/', isAuthorised, async (req, res) => {
    const { title, body, image } = req.body;
    try {
        const post = await Post.create({
            title: title,
            body: body,
            image: image,
            user_id: req.user
        })
        res.json({
            status: "Post has been made.",
            post
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
});

router.get('/', async (req, res) => {
    try {

        const posts = await Post.find();
        res.json({
            status: "Success",
            posts
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

module.exports = router;

