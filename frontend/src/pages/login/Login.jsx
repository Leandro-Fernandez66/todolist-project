import React from 'react'
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import styles from './styles.module.scss'

function Login() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                setErrorMessage("Credentials not valid");
                return;
            }

            const userData = await response.json();

            localStorage.setItem('appState', userData.token);

            navigate('/todos');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles['login-wrapper']}>
            <div className={styles['div-container']}>
                <h2 className={styles.title}>Sign In</h2>
                <form className={styles.form} onSubmit={handleSubmitLogin}>
                    <div className={styles['input-container']}>
                        <label htmlFor="email">Email:</label>
                        <input
                            className={styles.input}
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            required
                            onChange={(event) => {
                                console.log(event.target.value);
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                    <div className={styles['input-container']}>
                        <label htmlFor="password">Password:</label>
                        <input
                            className={styles.input}
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            required
                            onChange={(event) => {
                                console.log(event.target.value);
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                    <button className={styles.button} type="submit">login</button>
                </form>
                <a href="/register" className={styles['create-account']}>Create new account</a>
                {errorMessage && <p className={styles['message-error']}>{errorMessage}</p>}
            </div>
        </div>
    )
}

export default Login
