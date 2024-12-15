import React, { useState } from 'react';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ForgotPassApi from '../api/forgotPassApi'; // Import the API to make the login request
import Vector from '../assets/Vector.png'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // To navigate after login

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation to ensure fields aren't empty
        if (!email) {
            setErrorMessage('Please enter you email');
            return;
        }

        // Prepare the login data
        const userData = {
            "email": email,
        };

        try {
            // Send login request to the backend API
            const response = await ForgotPassApi(userData)

            if (response.status === 200) {
                // On success, redirect to the dashboard or home page
                navigate('/forgot-password-otp', {
                    state: { email}
                });
            } else {
                setErrorMessage('Invalid User ID or Password.');
            }
        } catch (error) {
            setErrorMessage('No user found with this email');
            console.error(error);
        }
    };

    return (
        <div className='login'>
            <header className='back-arrow'>
                <BackButton />
            </header>
            <section className='content'>
                <img src={Vector} alt="Icon" />
                <h1 className='font-sans text-xl'>Forgot Password</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        className='user-id'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    

                    
                    <button className='login-btn' type='submit'>Continue</button>
                </form>
              
            </section>
        </div>
    );
};

export default ForgotPassword;
