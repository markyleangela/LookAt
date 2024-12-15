import React, { useState } from 'react';
import '../styles/MobileVerification.css';
import Vector from '../assets/Vector.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import PasswordVerify from '../api/passwordVerifyOtp'; // Import the VerifyOtp function

const EmailVerification = () => {
    const [enteredCode, setEnteredCode] = useState('');  // State to store OTP input
    const [errorMessage, setErrorMessage] = useState('');  // State for error messages
    const location = useLocation();  // Access location state
    const navigate = useNavigate();  // Navigation hook

    const { email, password } = location.state || {};


    // Handle input change for OTP fields
    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {  // Ensure only numeric values are entered
            setEnteredCode((prev) => prev + value);  // Update entered code
        }
    };

    // Handle the verification of entered OTP code
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(enteredCode)
        console.log(typeof enteredCode);
        // Ensure OTP is entered
        if (!enteredCode) {
            
            setErrorMessage('Please enter the OTP.');
            return;
        }
        const intCode = parseInt(enteredCode)
        console.log(email)
        console.log(typeof email)

        console.log(password)
        console.log(typeof password)

        console.log(intCode)
        console.log(typeof intCode)

        const userData = {
            "otp": intCode
          };

        try {
            // Use VerifyOtp API to verify the OTP
            const response = await PasswordVerify(userData);

            if (response.status === 200) {
                // OTP verified successfully, redirect to account creation success page
                navigate('/change-password', {
                    state: { email }
                });
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid OTP or OTP has expired. Please try again.');
        }
    };

    return (
        <div className='mobile'>
            <header className='back-arrow'>
                <BackButton />
            </header>
            <section className='content-mobile'>
                <img src={Vector} alt="Verification Icon" />
                <h1 className='font-sans text-xl'>Forgot Password</h1>
                <p>Enter the Code sent to</p>
                <p>{email}</p>  {/* Display the email the code was sent to */}

                <div className='pin'>
                    {/* OTP input fields */}
                    <input
                        className='num-1'
                        placeholder='0'
                        maxLength="1"
                        value={enteredCode[0] || ''}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <input
                        className='num-2'
                        placeholder='0'
                        maxLength="1"
                        value={enteredCode[1] || ''}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <input
                        className='num-3'
                        placeholder='0'
                        maxLength="1"
                        value={enteredCode[2] || ''}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <input
                        className='num-4'
                        placeholder='0'
                        maxLength="1"
                        value={enteredCode[3] || ''}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
   

                <p className='font-sans text-xl'>
                    Didn't receive the code? <Link to='/resend-otp' className='login-a'>Tap here to resend</Link>
                </p>
                <button onClick={handleSubmit} className='verify-btn'>Verify</button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}  {/* Display error if OTP is invalid */}
            </section>
        </div>
    );
};

export default EmailVerification;
