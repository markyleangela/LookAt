import React, { useState } from 'react';
import '../styles/Login.css';
import PersonGear from '../assets/person-gear.png';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import LoginApi from '../api/loginApi'; // Import the API to make the login request

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // To navigate after login

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation to ensure fields aren't empty
        if (!userId || !password) {
            setErrorMessage('Please enter both User ID and Password.');
            return;
        }

        // Prepare the login data
        const loginData = {
            userId,
            password,
        };

        try {
            // Send login request to the backend API
            const response = await LoginApi(userId,loginData); // Assuming `login` is a method in `userApi`

            if (response.status === 200) {
                // On success, redirect to the dashboard or home page
                navigate('/home');
            } else {
                setErrorMessage('Invalid User ID or Password.');
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
                <img src={PersonGear} alt="Icon" />
                <h1 className='font-sans text-xl'>Log In</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <label>User ID</label>
                    <input
                        className='user-id'
                        placeholder='Enter your user ID'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        className='password'
                        type="password"
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link to='/signup' className='forgot-pass'>
                        <label>Forgot password?</label>
                    </Link>

                    <button className='login-btn' type='submit'>Log In</button>
                </form>
                <p className='font-sans text-xl'>
                    Don't have an account? <Link to='/signup' className='signup-a'>Sign up here</Link>
                </p>
            </section>
        </div>
    );
};

export default Login;
