const express = require('express');
const { createTodoController,
  getTodosController,
  getOneTodoController,
  getCompletedTodosController,
  updateStatusTodoController,
  deleteTodoController,
  updateTodoController
} = require('../controllers/todoController');

const routes = express.Router();

routes.get('/completed', getCompletedTodosController);
routes.post('', createTodoController);
routes.get('', getTodosController);
routes.get('/:id', getOneTodoController);
routes.put('/:id', updateStatusTodoController);
routes.delete('/:id', deleteTodoController);
routes.put('/update/:id', updateTodoController);

module.exports = routes;
