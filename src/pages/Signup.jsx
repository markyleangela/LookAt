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
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Use useNavigate to redirect

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!mobileNumber || !password || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

  

        const userData = {
                    userDto: {
                        userId: 0,
                        userName: "string",
                        firstName: "string",
                        lastName: "string",
                        password: password,
                        mobileNumber: mobileNumber,
                        date: "2024-11-30T13:11:38.086Z",
                        physicalIdNumber: "string",
                        purok: "string",
                        barangayLoc: "string",
                        cityMunicipality: "string",
                        province: "string",
                        email: "string",
                        isVerified: false,
                        barangayId: "string"
                    },
                    "otp": 0
        }

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
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
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