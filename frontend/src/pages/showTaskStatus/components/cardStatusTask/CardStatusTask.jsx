import React from 'react'
import styles from './styles.module.scss'

function CardStatusTask({ statusOfTask }) {
    return (
        <div className={styles.container}>
            <p className={styles['task-title']}>{statusOfTask.title}</p>
            <p className={styles['task-description']}>{statusOfTask.description}</p>
        </div>
    )
}

export default CardStatusTask
