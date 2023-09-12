//version 1 is going to specify the path or the route to all the codes that you want to consider as versions
const express = require('express');
const api = express.Router();
const users = require('../../routes/user');
const { requireAuthentication } = require('../../middlewares/authentication.middleware'); // Import the authentication middleware

api.get("/", (req, res) => res.status(200).json({
    status: 'success',
    message: 'Welcome to My Books App API'
}));

// Apply the authentication middleware to protect user-related routes
api.use("/users", requireAuthentication, users);

module.exports = api;
