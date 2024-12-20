import React from 'react'
import styles from './styles.module.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Modal({ task, updatedTask }) {

    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState({ taskName: task.title, taskDescription: task.description })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTodo(prevTodo => ({
            ...prevTodo,
            [name]: value
        }));
    };

    return (
        <>
            <button className={styles['edit-button']} onClick={() => setOpen(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
            {
                open && (
                    <div className={styles['modal-container']}>
                        <div className={styles['modal-content']}>
                            <form className={styles['modal-form']} onSubmit={(e) => updatedTask(e, task._id, todo)}>
                                <div className={styles.inputs}>
                                    <input type="text" className={styles['input-name']} placeholder='enter task name' name='taskName' value={todo.taskName} onChange={handleInputChange} />
                                    <input type="text" className={styles['input-description']} placeholder='task description' name='taskDescription' value={todo.taskDescription} onChange={handleInputChange} />
                                </div>
                                <button type='submit' className={styles['update-button']} >Update Task</button>
                            </form>
                            <div className={styles['close-container']}>
                                <button className={styles['close-button']} onClick={() => setOpen(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Modal