const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/assignment', () => {
    console.log('Database connected')
})



mongoose.set('strictQuery', true);

app.use(bodyParser.json());

const PORT = 3000


app.use(express.urlencoded());





app.listen(PORT, () => console.log('Server is on PORT', PORT));
//