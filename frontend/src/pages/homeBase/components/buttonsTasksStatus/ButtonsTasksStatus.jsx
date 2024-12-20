import React from 'react'
import styles from './styles.module.scss'
import { useNavigate } from "react-router-dom"

function ButtonsTasksStatus() {

    const navigate = useNavigate()

    const handleTaskCompleted = () => {
        navigate(`/tasks/completed?todoStatus=true`)
    }

    const handleTaskUncompleted = () => {
        navigate(`/tasks/completed?todoStatus=false`)
    }

    return (
        <div className={styles['buttons-container']}>
            <button className={styles['button-completed']} onClick={() => handleTaskCompleted()}>Show Completed Tasks</button>
            <button className={styles['button-uncompleted']} onClick={() => handleTaskUncompleted()}>Show Uncompleted Tasks</button>
        </div>
    )
}

export default ButtonsTasksStatus