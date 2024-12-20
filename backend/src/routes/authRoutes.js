const express = require('express');
const { registerController, loginController } = require('../controllers/authController');
const routes = express.Router();

routes.post('/register', registerController);
routes.post('/login', loginController)

module.exports = {
    authRoutes: routes
};