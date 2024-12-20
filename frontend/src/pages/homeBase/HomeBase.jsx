import styles from "./styles.module.scss";
import TodoList from "./components/todoList/TodoList.jsx";
import AddTodoForm from "./components/addTodoForm/AddTodoForm.jsx";
import { useEffect } from "react";
import { useTasks } from "../../context/TasksContext.jsx";
import ButtonsTasksStatus from "./components/buttonsTasksStatus/ButtonsTasksStatus.jsx";
import LogoutButton from "./components/logoutButton/LogoutButton.jsx";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HomeBase() {

  const { saveTasks } = useTasks()
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {

    async function fetchTasks() {
      const token = localStorage.getItem('appState')
      const decodedToken = jwtDecode(token);
      try {
        const response = await fetch(`${apiUrl}/todos`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });

        if (response.status === 401) {
          navigate('/login')
          return
        }

        const tasksData = await response.json();
        saveTasks(tasksData)
        setUserEmail(decodedToken.email)
      } catch (error) {
        console.log("Error fetching data: ", error)
      }
    }
    fetchTasks()
  }, [])

  return (
    <div>
      <header className={styles.header}>
        <h1>To Do List</h1>
        <p className={styles['user-email']}>{userEmail}</p>
        <LogoutButton />
      </header>

      <main className={styles['main-container']}>
        <AddTodoForm />
        <ButtonsTasksStatus />
        <h2 className={styles['tasks-title']}>Tasks:</h2>
        <TodoList />
      </main>
    </div>
  );
}

export default HomeBase;
