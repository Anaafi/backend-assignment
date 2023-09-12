const UserService = require('../services/user.service');

// Create a new user
const createUser = async (req, res, next) => {
    try {
        const response = await UserService.createUser(req.body);
        return res.status(response.code).json(response);
    } catch (error) {
        next(error);
    }
};

// Fetch all users
const getAllUsers = async (req, res, next) => {
    try {
        // logic to fetch all users from the service
        const users = await UserService.getAllUsers();
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// Fetch a single user by ID
const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id; // Extract the user ID from the request parameters
        // logic to fetch a user by ID from the service
        const user = await UserService.getUserById(userId);
        if (!user) {
            return res.status(404).json({
                code: 404,
                status: 'error',
                message: 'User not found',
                data: null
            });
        }
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'User fetched successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// Update user profile by ID
const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id; // Extract the user ID from the request parameters
        const updatedData = req.body; // Extract the updated user data from the request body
        // logic to update the user's profile from the service
        const updatedUser = await UserService.updateUser(userId, updatedData);
        if (!updatedUser) {
            return res.status(404).json({
                code: 404,
                status: 'error',
                message: 'User not found',
                data: null
            });
        }
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'User profile updated successfully',
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

// Delete user profile by ID
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id; // Extract the user ID from the request parameters
        // logic to delete the user's profile from the service
        const deletedUser = await UserService.deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({
                code: 404,
                status: 'error',
                message: 'User not found',
                data: null
            });
        }
        return res.status(200).json({
            code: 200,
            status: 'success',
            message: 'User profile deleted successfully',
            data: deletedUser
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};


/**
 * Controller creating a new user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns JSON object as response data
 */