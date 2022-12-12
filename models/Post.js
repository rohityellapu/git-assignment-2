const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    user_id: Number,
    image: String
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;