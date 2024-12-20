import React from 'react'
import { useNavigate } from "react-router-dom"
import styles from './styles.module.scss'
import Modal from '../modal/Modal'
import { useTasks } from '../../../../context/TasksContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const TodoItem = ({ task }) => {

  const { deleteTask, taskStatus, updatedTask } = useTasks()

  const navigate = useNavigate()

  const handleTaskClick = (id) => {
    navigate(`/tasks/${id}`)
  }

  return (
    <li className={styles.task}>
      <div className={styles['div-container']}>
        <input type="checkbox" defaultChecked={task.is_completed} onClick={() => taskStatus(task._id)} />
        <p className={task.is_completed ? `${styles['task--completed']}` : `${styles['task--uncompleted']}`} onClick={() => handleTaskClick(task._id)} >{task.title}</p>
      </div>
      <div className={styles.editDeleteContainer}>
        <Modal task={task} updatedTask={updatedTask} />
        <button className={styles['delete-button']} onClick={() => deleteTask(task._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
      </div>
    </li>
  )
}

export default TodoItem
