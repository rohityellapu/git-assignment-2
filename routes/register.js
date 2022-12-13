const router = require('express').Router();
const User = require('../models/User')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
// Your routing code goes here

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let { name, email, password } = req.body;
    try {
        if (name && email && password) {
            let user = await User.findOne({ email: email })
            if (user) {
                res.status(409).json({
                    status: "Failed",
                    message: "User already exists with that email"
                })
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        status: "Error",
                        message: err.message
                    })
                }
                else {
                    user = await User.create({
                        name: name,
                        email: email,
                        password: hash
                    })
                    return res.json({
                        status: "Success",
                        message: "User successfully created",
                        user
                    })
                }
            })
        }
        else {
            res.status(400).json({
                status: "Failed",
                message: "Missing credentials."
            })
        }
    }
    catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

// Just For development purpose
router.get('/', async (req, res) => {
    let users = await User.find();
    res.json({
        status: "Success",
        users
    })
})
module.exports = router;

