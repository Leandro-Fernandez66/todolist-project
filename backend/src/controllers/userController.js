const ModelUser = require('../models/userModel');

const getAllUsersController = async (req, res) => {
    try {
        const users = await ModelUser.find({}, 'name email');
        res.status(200).json({ users });
    } catch (error) {
        console.log('Error getting all users', error);
        res.status(500).json({
            status: 'error',
            message: 'error when getting all users'
        });
    }
}

const logoutController = async (req, res) => {

    res.status(200).json({
        status: 'OK',
        message: 'Logout successful'
    });
};

module.exports = {
    getAllUsersController,
    logoutController
}