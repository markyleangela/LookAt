import React, { useState } from 'react';
import '../styles/EmailVerification.css';
import MessageIcon from '../assets/message.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import VerifyOtp from '../api/verifyOtp'; // Import the VerifyOtp function
import UserApi from '../api/userApi';

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
            "userDto": {
              "userId": 0,
              "userName": "N/A",
              "firstName": "N/A",
              "lastName": "N/A",
              "password": password,
              "mobileNumber": "N/A",
              "date": "2024-12-12T11:14:38.581Z",
              "physicalIdNumber": "N/A",
              "purok": "N/A",
              "barangayLoc": "N/A",
              "cityMunicipality": "N/A",
              "province": "N/A",
              "email": email,
              "isVerified": true,
              "barangayId": "N/A"
            },
            "otp": intCode
          };

        try {
            // Use VerifyOtp API to verify the OTP
            const response = await VerifyOtp(userData);

            if (response.status === 200) {
                // OTP verified successfully, redirect to account creation success page
                navigate('/account-created', {
                    state: { email, password }
                });
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid OTP or OTP has expired. Please try again.');
        }
    };

    const handleResend = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setErrorMessage('Email or password is missing. Cannot resend code.');
            return;
        }
    
        console.log('Resending OTP for Email:', email);
    
        const userData = {
            email,
            password
        };
    
        try {
            const response = await UserApi(userData); // Call the resend API
            if (response.status === 200) {
                console.log('OTP Resent Successfully');
            } else {
                setErrorMessage('Failed to resend OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error while resending OTP:', error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };
    

    return (
        <div className='mobile'>
            <header className='back-arrow'>
                <BackButton />
            </header>
            <section className='content-mobile'>
                <img src={MessageIcon} alt="Verification Icon" />
                <h1 className='font-sans text-xl'>Email Verification</h1>
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
                    Didn't receive the code? <button onClick={handleResend} className='resend-btn'>Resend Code</button>
                </p>
                <button onClick={handleSubmit} className='verify-btn'>Verify</button>
                {errorMessage && <p className='error-message'>{errorMessage}</p>}  {/* Display error if OTP is invalid */}
            </section>
        </div>
    );
};

export default EmailVerification;
