const ModelTodo = require('../models/todoModel');

const createTodoController = async (req, res) => {
    const { title, description, is_completed } = req.body
    const userId = req.user.id

    try {
        const newTodo = new ModelTodo({
            title,
            description,
            is_completed,
            user_id: userId
        });

        await newTodo.save();

        res.status(201).json({
            status: 'OK',
            message: 'Successfully created todo',
            data: newTodo
        });
    } catch (error) {
        res.status(500).json(
            {
                status: 'error',
                message: 'error when creating a new todo'
            }
        );
    }
}

const getTodosController = async (req, res) => {
    const userId = req.user.id
    try {
        const todos = await ModelTodo.find({ user_id: userId });
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting todos');
    }
}

const getOneTodoController = async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    try {
        const todo = await ModelTodo.findOne({ _id: id, user_id: userId });

        if (!todo) {
            return res.status(404).json({
                status: 'not found',
                message: 'Todo not found'
            });
        }

        res.json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Error when getting todo'
        });
    }
}

const getCompletedTodosController = async (req, res) => {
    const userId = req.user.id
    console.log('User ID:', req.user.id);
    const { todoStatus } = req.query;
    try {

        const todos = await ModelTodo.find({ user_id: userId, is_completed: todoStatus });
        console.log('Query result:', todos);

        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting todos');
    }
}

const updateStatusTodoController = async (req, res) => {
    const { id } = req.params
    const { isCompleted } = req.body

    try {
        console.log('id', id);
        const updateTodo = await ModelTodo.findByIdAndUpdate(
            id,
            { is_completed: isCompleted },
            { new: true }
        );

        if (!updateTodo) {
            return res.status(404).json({
                status: 'not found',
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            status: 'OK',
            message: 'Successfully updated todo',
            data: updateTodo
        });
    } catch (error) {
        console.log('Error updating todo', error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong when updating'
        });
    }
}

const deleteTodoController = async (req, res) => {
    const { id } = req.params

    try {
        const deletedTodo = await ModelTodo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                status: 'not found',
                message: 'Todo not found'
            });
        }

        res.status(204).json({
            status: 'OK',
            message: 'Successfully deleted todo',
        });

    } catch (error) {
        console.log('Error deleting todo', error);
        res.status(500).json({
            status: 'error',
            message: 'Error when deleting todo'
        });
    }
}

const updateTodoController = async (req, res) => {
    const { id } = req.params
    const { title, description } = req.body

    try {
        console.log('id', id);
        const updateTodo = await ModelTodo.findByIdAndUpdate(
            id,
            {
                title,
                description
            },
            { new: true }
        );

        if (!updateTodo) {
            return res.status(404).json({
                status: 'not found',
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            status: 'OK',
            message: 'Successfully updated todo',
            data: updateTodo
        });
    } catch (error) {
        console.log('Error updating todo', error);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong when updating'
        });
    }
}

module.exports = {
    createTodoController,
    getTodosController,
    getOneTodoController,
    getCompletedTodosController,
    updateStatusTodoController,
    deleteTodoController,
    updateTodoController
}