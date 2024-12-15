import React, { useState } from 'react';
import '../styles/Signup.css';
import PersonGear from '../assets/person-gear.png';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import UserApi from '../api/userApi'; // Import the registerUser function
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Use useNavigate to redirect

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!email || !password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        const userData = {
            "email": email,
            "password": password
        };
  


        try {
            // Use registerUser from UserApi
            const response = await UserApi(userData);  // Call the function to register the user
            console.log(response.status)
            if (response.status === 200) {
                // Pass the email and password to the email verification page
                console.log("Signup - Email:", email);
                console.log("Signup - Password:", password);
                navigate('/email-verification', {
                    state: { email, password }
                });
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='login'>
            <header className='back-arrow'>
                <BackButton />
            </header>
            <section className='content'>
                <img src={PersonGear} alt="Icon" />
                <h1 className='font-sans text-xl'>SIGN UP</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button className='login-btn' type='submit'>Sign Up</button>
                    <p className='font-sans text-xl'>Already have an account? <Link to='/login' className='login-a'>Log in</Link></p>
                </form>
            </section>
        </div>
    );
};

export default Signup;
