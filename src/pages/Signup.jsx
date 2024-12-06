import React from 'react';
import { useState } from 'react';
import '../styles/Signup.css';
import PersonGear from '../assets/person-gear.png';
import ArrowButton from '../assets/back-arrow.png';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useNavigate } from 'react-router-dom';
import UserApi from '../api/userApi'; // Import the registerUser function
import {sendVerificationCode} from '../components/SendVerification'



const Signup  = () =>  {
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

  

<<<<<<< HEAD
       const userData = {
            userDto: {
                mobileNumber,
                password,
            },
            otp: "0",
        };
=======
        const userData = {
                    userDto: {
                        userId: 0,
                        userName: "string",
                        firstName: "string",
                        lastName: "string",
                        password: password,
                        mobileNumber: "string",
                        date: "2024-11-30T13:11:38.086Z",
                        physicalIdNumber: "string",
                        purok: "string",
                        barangayLoc: "string",
                        cityMunicipality: "string",
                        province: "string",
                        email: email,
                        isVerified: false,
                        barangayId: "string"
                    },
                    "otp": 0
        }
>>>>>>> 225552261cde9a97469f91a70746f99c38332cac

        try {
            // Use registerUser from UserApi
            const response = await UserApi(userData);  // Call the function to register the user
            
            if (response.status === 201) {

                navigate('/account-created');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='login'>
            <header className='back-arrow'>
                <BackButton/>
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