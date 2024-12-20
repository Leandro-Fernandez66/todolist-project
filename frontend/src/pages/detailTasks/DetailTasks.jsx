import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from "react-router-dom"
import Card from './components/card/Card'
import styles from './styles.module.scss'

function DetailTasks() {

  const apiUrl = import.meta.env.VITE_API_URL;

  const [selectedTask, setSelectedTask] = useState({})
  const { taskId } = useParams()

  useEffect(() => {
    async function fetchTask() {
      const token = localStorage.getItem('appState')
      try {
        const response = await fetch(`${apiUrl}/todos/${taskId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        const data = await response.json()
        setSelectedTask(data)
      } catch (error) {
        console.log("Error fetching data: ", error)
      }
    }
    fetchTask()
  }, [taskId]
  )

  return (
    <div className={styles['detail-container']}>
      <h1 className={styles['detail-title']}>Detail Task</h1>
      <Card selectedTask={selectedTask} />
    </div>
  )
}

export default DetailTasks