const jwt = require('jsonwebtoken');
const db = require('../models');
const { JWT_SECRET } = process.env;

const User = db.users;

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    const method = req.method;
    console.log(`HTTP Method: ${method}`);
    console.log(`token: ${token}`);

    if (token) {
        jwt.verify(token, JWT_SECRET, async (err, user) => {
            if (err) {
                return res.status(403).json({
                    code: 403,
                    message: 'Invalid Token. Please try login again'
                });
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            code: 401,
            message: 'Unauthorized'
        });
    }
};

module.exports = authenticateJWT;
