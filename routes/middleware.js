const jwt = require('jsonwebtoken');
const Post = require('../models/Post')
const User = require('../models/User');

function isAuthenticated(req, res, next) {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: "Failed",
                    message: "Invalid token"
                })
            }
            req.user = decoded.data;
            next();
        })
    }
    else {
        return res.status(403).json({
            status: "Failed",
            message: "Token not found. Try log in to create token for authentication and authorization."
        })
    }
}

async function isAuthor(req, res, next) {
    const { id } = req.params;
    try {

        const post = await Post.findOne({ _id: id });

        if (!post.user_id.equals(req.user)) {
            return res.status(401).json({
                status: "Failed",
                message: "You are not authorised to update another user's post."
            })
        }
        next();

    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}

module.exports = { isAuthenticated, isAuthor };