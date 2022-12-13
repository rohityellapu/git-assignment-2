const router = require('express').Router();

const bodyParser = require('body-parser');
// Your routing code goes here

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())

router.post('/', (req, res) => {

})


module.exports = router;

