import { createContext, useContext, useState } from "react";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({ name: "", description: "" });

    const saveTasks = (todos) => setTasks(todos);

    const taskStatus = (taskId) => {
        const arrayIndex = tasks.findIndex((task) => task._id === taskId)
        tasks[arrayIndex].is_completed = !tasks[arrayIndex].is_completed

        const fetchStatusTask = async () => {
            const token = localStorage.getItem('appState')
            try {
                const response = await fetch(`${apiUrl}/todos/${taskId}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ isCompleted: tasks[arrayIndex].is_completed }),
                })

                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }

                const responseData = await response.json()
                console.log("Success")
                const updatedStatusTask = tasks.map(task => task._id === taskId ? { ...task, is_completed: responseData.data.is_completed } : task)
                setTasks(updatedStatusTask)
            } catch (error) {
                console.error("Error:", error)
            }
        }
        fetchStatusTask()
    };

    const handleChange = (event) => {
        const {
            target: { name, value },
        } = event;

        setTask({
            ...task,
            [name]: value,
        });
    };

    const handleSubmitCreateTask = (event) => {
        event.preventDefault()

        const newTask = {
            title: task.name,
            description: task.description,
            is_completed: false
        };

        const addTask = async () => {
            const token = localStorage.getItem('appState')
            try {
                const response = await fetch(`${apiUrl}/todos`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTask),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }

                console.log("Success")

                const responseData = await response.json()
                const newList = [...tasks, responseData.data];
                setTasks(newList);

            } catch (error) {
                console.error("Error:", error)
            }
        }
        addTask()

        setTask({ name: "", description: "" });
    };

    const deleteTask = (taskId) => {

        const taskRemove = tasks.filter(
            (removeOfTasks) => removeOfTasks._id !== taskId
        );
        const deleteData = async () => {
            const token = localStorage.getItem('appState')
            try {
                const response = await fetch(`${apiUrl}/todos/${taskId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                console.log(response)

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                console.log("Task deleted successfully")

            } catch (error) {
                console.error("Error:", error)
            }
        };
        deleteData()

        setTasks(taskRemove)
    }

    const updatedTask = (e, taskId, todo) => {
        e.preventDefault()

        const putUpdatedTask = async () => {
            const token = localStorage.getItem('appState')
            try {
                const response = await fetch(`${apiUrl}/todos/update/${taskId}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: todo.taskName,
                        description: todo.taskDescription
                    }),
                })

                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }

                const responseData = await response.json()
                console.log("Success")

                const updatedListTasks = tasks.map(task => task._id === taskId ? { ...task, title: responseData.data.title, description: responseData.data.description } : task)
                setTasks(updatedListTasks)
            } catch (error) {
                console.error("Error:", error)
            }
        }
        putUpdatedTask()
    }

    return (
        <TasksContext.Provider value={{ task, tasks, saveTasks, taskStatus, handleChange, handleSubmitCreateTask, deleteTask, updatedTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => useContext(TasksContext);