const express = require('express');
const { getAllUsersController, logoutController } = require('../controllers/userController');
const routes = express.Router();

routes.get('', getAllUsersController);
routes.post('/logout', logoutController);

module.exports = routes;