const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const postRouts = require('./routes/post')
mongoose.connect('mongodb://localhost/assignment', () => {
    console.log('Database connected')
})
require('dotenv').config();

mongoose.set('strictQuery', true);

app.use(bodyParser.json());

const PORT = 3000

app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('Welcome......Goto /login route to get logged in . If not already logged in go to /register route to register yourself')
})

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/posts', postRouts);

app.use('/*', (req, res) => {
    res.status(404).send('Page Not Found');
})


app.listen(PORT, () => console.log('Server is on PORT', PORT));
//