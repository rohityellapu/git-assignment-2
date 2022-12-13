const jwt = require('jsonwebtoken');


function isAuthorised(req, res, next) {
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

module.exports = isAuthorised;