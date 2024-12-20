import React from 'react'
import styles from './styles.module.scss'
import { useNavigate } from "react-router-dom"

function RegisterDone() {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }

    return (
        <div className={styles['div-container']}>
            <div className={styles['div-registration']}>
                <h1 className={styles.title}>Successful Registration</h1>
                <button className={styles.button} onClick={() => handleClick()}>Next</button>
            </div>
        </div>
    )
}

export default RegisterDone