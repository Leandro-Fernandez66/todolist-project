const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { getUserByEmail, createUser } = require('../config/users')

const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name, email, hashedPassword);

    res.status(201).json({
        status: 'OK',
        message: 'Successfully registered user'
    })
}

const loginController = async (req, res) => {
    const secretKey = process.env.JWT_SECRET_KEY
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(401).json({
            message: 'Authentication failed, invalid user'
        })
    }
    if (secretKey) {
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (isPasswordValid) {
            const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' })
            return res.status(200).json({ token })
        }

        return res.status(401).json({
            message: 'Authentication failed, invalid password'
        })
    }
}

module.exports = {
    registerController,
    loginController
}