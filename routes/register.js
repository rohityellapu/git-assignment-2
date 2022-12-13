const router = require('express').Router();
const User = require('../models/User')
const bodyParser = require('body-parser');
// Your routing code goes here

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.post('/', (req, res) => {
    let { name, email, password } = req.body;
    try {
        if (name && email && password) {

        }
    }
    catch (e) {

    }
})


module.exports = router;

