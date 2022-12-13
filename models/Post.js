const mongoose = require('mongoose');
const { Schema } = mongoose;
const postSchema = new Schema({
    title: String,
    body: String,
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    image: String
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;