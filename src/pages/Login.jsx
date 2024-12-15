import React, { useState } from 'react';
import '../styles/Login.css';
import PersonGear from '../assets/person-gear.png';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import LoginApi from '../api/loginApi'; // Import the API to make the login request
import { useUser } from '../context/UserContext'; // Import the context

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // To navigate after login
    const { loginUser } = useUser(); // Access the loginUser function from context

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation to ensure fields aren't empty
        if (!email || !password) {
            setErrorMessage('Please enter both User ID and Password.');
            return;
        }

        // Prepare the login data
        const loginData = {
            "email": email,
            "password": password
        };

        try {
            // Send login request to the backend API
            const response = await LoginApi(loginData);

            if (response.status === 200) {
                // Assuming the response contains userId and other user details
                const userData = response.data; // You can also include other details if needed
                console.log(userData);
                
                // Store user data in context
                loginUser(userData); 

                // On success, redirect to the user's home page with their ID in the URL
                navigate(`/${userData.userId}/home`);
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
                    <label>Email</label>
                    <input
                        className='user-id'
                        placeholder='Enter your email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        className='password'
                        type="password"
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link to='/forgot-password' className='forgot-pass'>
                        <label>Forgot password?</label>
                    </Link>

                    <button className='login-btn' type='submit'>Log In</button>
                </form>
                <p className='font-sans text-xl'>
                    Don't have an account? <Link to='/register' className='login-a'>Sign up here</Link>
                </p>
            </section>
        </div>
    );
};

export default Login;
