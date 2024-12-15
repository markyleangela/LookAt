import React, { useState } from 'react';
import '../styles/Login.css';
import LockedClosed from '../assets/LockClosed.png';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ChangePasswordApi from '../api/changePasswordApi';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const { email } = state || {}; // Safely extract email from state


    console.log(email)
    console.log(password)
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!confirmpassword || !password) {
            setErrorMessage('Both fields are required');
            return;
        }

        if (confirmpassword !== password) {
            setErrorMessage('Passwords do not match');
            return;
        }
        
        const changeData = {
            "email": email, // Pass the email
            "password": password
        };

        try {
            const response = await ChangePasswordApi(changeData);

            if (response.status === 200) {
                navigate('/login', { state: { email, password } });
            } else {
                setErrorMessage('Error changing password.');
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className='login'>
            <header className='back-arrow'>
                <BackButton />
            </header>
            <section className='content'>
                <img src={LockedClosed} alt="Icon" />
                <h1 className='font-sans text-xl'>Password Reset</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        className='user-id'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className='password'
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className='login-btn' type='submit'>Change Password</button>
                </form>
            </section>
        </div>
    );
};

export default ChangePassword;
