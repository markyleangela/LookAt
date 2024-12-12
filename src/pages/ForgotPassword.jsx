import React from 'react';
import '../styles/MobileVerification.css';
import MessageIcon from '../assets/message.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const ForgotPassword  = () =>  {
    const [enteredCode, setEnteredCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { mobileNumber, verificationCode } = location.state || {};

    const handleVerify = () => {
        if (enteredCode === verificationCode) {
            navigate('/account-created');
        } else {
            setErrorMessage('Invalid verification code. Please try again.');
        }
    };

    return (
        <div className='mobile'>
            <header className='back-arrow'>
                <BackButton/>
            </header>
            <section className='content-mobile'>
                
                <img src={MessageIcon} alt="Icon" />
                <h1 className='font-sans text-xl'>Forgot Password</h1>
                <p>Enter the Code sent to</p>
                <p>09XXXXXXXXX</p>
           
                <div className='pin'>
                    <input className='num-1' placeholder='0'></input>
                    <input className='num-2' placeholder='0'></input>
                    <input className='num-3' placeholder='0'></input>
                    <input className='num-4' placeholder='0'></input>
                    
                </div>
                
                

              
                
                <p className='font-sans text-xl'>Didn't receive the code? <Link to='/login' className='login-a'>Tap here to resend</Link></p>
                <button onClick={handleVerify} className='verify-btn' >Verify</button>
                {errorMessage && <p>{errorMessage}</p>}
            </section>
            

        </div>
    );
};

export default ForgotPassword;