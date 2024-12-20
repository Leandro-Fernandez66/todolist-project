import React from 'react'
import HomeBase from './pages/homeBase/HomeBase'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import DetailTasks from './pages/detailTasks/DetailTasks'
import RegisterDone from './pages/registerDone/RegisterDone'
import ShowTaskStatus from './pages/showTaskStatus/ShowTaskStatus'
import { useState, useEffect } from "react";
import { TasksProvider } from './context/TasksContext'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('appState');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  return (

    <TasksProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? '/todos' : '/login'} />} />
          <Route path="/todos" element={<HomeBase />} />
          <Route path="/tasks/:taskId" element={<DetailTasks />} />
          <Route path='/tasks/completed' element={<ShowTaskStatus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerdone" element={<RegisterDone />} />
        </Routes>
      </BrowserRouter>
    </TasksProvider>
  )
}

export default App
