const jwt = require('jsonwebtoken');
const config = require('../config/env/index');

const requireAuthentication = (req, res, next) => {
    // Get the JWT token from the request headers
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            code: 401,
            message: 'Unauthorized',
            data: null,
            status: 'error'
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({
            code: 401,
            message: 'Unauthorized',
            data: null,
            status: 'error'
        });
    }
};

module.exports = {
    requireAuthentication
};
