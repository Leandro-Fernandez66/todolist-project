import React from 'react'
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import styles from './styles.module.scss'

function Register() {

    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmitRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                setErrorMessage("User already exists");
                return;
            }

            console.log('register done');

            navigate('/registerDone');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles['register-wrapper']}>
            <div className={styles['div-container']}>
                <h2 className={styles.title}>Register User</h2>
                <form className={styles.form} onSubmit={handleSubmitRegister}>
                    <div className={styles['input-container']}>
                        <label htmlFor="name">Full Name:</label>
                        <input
                            className={styles.input}
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Enter your full name"
                            required
                            onChange={(event) => {
                                console.log(event.target.value);
                                setName(event.target.value);
                            }}
                        />
                    </div>
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
                    <button className={styles.button} type="submit">Create Account</button>
                </form>
                {errorMessage && <p className={styles['register-error']}>{errorMessage}</p>}
            </div>
        </div>
    )
}

export default Register