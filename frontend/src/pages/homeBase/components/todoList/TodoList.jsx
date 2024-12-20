import React from 'react'
import TodoItem from '../todoItem/TodoItem.jsx'
import styles from './styles.module.scss'
import { useTasks } from '../../../../context/TasksContext.jsx'

function TodoList() {

  const { tasks } = useTasks()

  return (
    <ul className={styles['tasks-list']}
      style={tasks.length < 1 ? { backgroundColor: '#333' } : {}}  >
      {tasks.map(task => (
        <TodoItem key={task._id} task={task} />
      ))}
    </ul>
  )
}

export default TodoList