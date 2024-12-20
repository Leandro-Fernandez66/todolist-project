import React from 'react'
import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import CardStatusTask from './components/cardStatusTask/CardStatusTask'

function ShowTaskStatus() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const [taskStatusList, setTaskStatusList] = useState([])

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const todoStatus = queryParams.get("todoStatus");

    useEffect(() => {
        async function fetchTask() {
            const token = localStorage.getItem('appState')
            try {
                const response = await fetch(`${apiUrl}/todos/completed?todoStatus=${todoStatus}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });
                const tasksStatusdata = await response.json()
                setTaskStatusList(tasksStatusdata)

                if (response.status === 404) {
                    { <h1>Tasks not found</h1> }
                }

            } catch (error) {
                console.log("Error fetching data: ", error)
            }
        }
        fetchTask()
    }, [todoStatus]
    )

    return (
        <div className={styles['tasks-container']}>
            {todoStatus === 'true' ? <h1 className={styles['title-completed']}>Completed Tasks</h1> : <h1 className={styles['title-uncompleted']}>Uncompleted Tasks</h1>}

            <div className={todoStatus === 'true' ? styles.listCompleted : styles.listUncompleted}>
                <div className={todoStatus === 'true' ? styles.wrapperCompleted : styles.wrapperUncompleted}>
                    <div className={styles['div-name']}>Name:</div>
                    <div className={styles['div-description']}>Description:</div>
                </div>
                {taskStatusList.map(statusOfTask => (
                    <CardStatusTask key={statusOfTask._id} statusOfTask={statusOfTask} />
                ))}
            </div>
        </div>
    )
}

export default ShowTaskStatus

