const router = require('express').Router();
const User = require('../models/User')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Your routing code goes here

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.post('/', async (req, res) => {
    let { email, password } = req.body;

    try {
        if (email && password) {
            let user = await User.findOne({ email: email })
            if (!user) {
                res.status(409).json({
                    status: "Failed",
                    message: "Invalid email or password"
                })
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return res.status(500).json({
                        status: "Error",
                        message: err.message
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: user._id
                    }, process.env.SECRET);
                    return res.json({
                        status: "Success",
                        message: "Login Successful",
                        token
                    })
                }
                else {
                    return res.status(401).json({
                        status: "Failed",
                        message: "Invalid email or password"
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


module.exports = router;

