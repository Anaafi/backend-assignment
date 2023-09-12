const {
    addUser,
    findUserByUsername,
    findUserById, 
    updateUserById, 
    deleteUserById 
} = require('../queries/users');

const { runQuery } = require('../config/database.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env/index');

// Create new user
const createUser = async (body) => {
    const { password, firstName, lastName, username } = body;

    // Check if user already exists in db
    const userExist = await runQuery(findUserByUsername, [username]);
    if (userExist.length > 0) {
        throw {
            code: 409,
            message: 'User already exists',
            data: null,
            status: 'error'
        };
    }

    // Encrypt password
    const saltRounds = 12;
    const hash = bcrypt.hashSync(password, saltRounds);
    const response = await runQuery(addUser, [firstName, lastName, username, hash, "user"]);

    return {
        code: 201,
        status: 'success',
        message: 'New user added successfully',
        data: response[0]
    };
};

// Fetch all users - username, firstName, and lastName
const fetchAllUsers = async () => {
    const users = await runQuery(`SELECT username, firstName, lastName FROM users`);
    return users;
};

// Fetch a single user by id
const fetchUserById = async (userId) => {
    const user = await runQuery(findUserById, [userId]);
    return user[0];
};

// Update user by id 
const updateUserProfile = async (userId, updatedData) => {
    const { firstName, lastName, username } = updatedData;
    const response = await runQuery(updateUserById, [firstName, lastName, username, userId]);
    return response[0];
};

// Delete user by id 
const deleteUserProfile = async (userId) => {
    const response = await runQuery(deleteUserById, [userId]);
    return response[0];
};

module.exports = {
    createUser,
    fetchAllUsers,
    fetchUserById,
    updateUserProfile,
    deleteUserProfile
};
