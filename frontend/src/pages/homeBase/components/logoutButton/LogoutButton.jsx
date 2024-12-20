import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss'

function LogoutButton() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('appState')
        try {
            const response = await fetch('http://localhost:3000/users/logout', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                localStorage.removeItem('appState');

                navigate('/login');

                alert('You have successfully logged out');
            } else {
                alert('There was a problem logging out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Error logging out');
        }
    };

    return (
        <button className={styles['logout-button']} onClick={handleLogout}>log out</button>
    );
};

export default LogoutButton