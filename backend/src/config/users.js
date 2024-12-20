const ModelUser = require('../models/userModel');

const getUserByEmail = async (email) => {
    try {
        const userResult = await ModelUser.findOne({ email: email });
        return userResult;
    } catch (error) {
        console.error('Error getting user via email', error);
    }
}

const createUser = async (name, email, hashedPassword) => {
    try {
        const newUser = new ModelUser({
            name: name,
            email: email,
            password: hashedPassword
        });

        const saveUser = await newUser.save();
    } catch (error) {
        console.error('Error creating user', error);
    }
};

module.exports = {
    getUserByEmail,
    createUser
}
