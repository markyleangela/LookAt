import React from 'react';
import '../styles/MobileVerification.css';
import MessageIcon from '../assets/message.png';
import { Link } from 'react-router-dom';

import BackButton from '../components/BackButton';

const MobileVerification  = () =>  {
    return (
        <div className='mobile'>
            <header className='back-arrow'>
                <BackButton/>
            </header>
            <section className='content-mobile'>
                
                <img src={MessageIcon} alt="Icon" />
                <h1 className='font-sans text-xl'>Mobile Number Verification</h1>
                <p>Enter the Code sent to</p>
                <p>09XXXXXXXXX</p>
           
                <div className='pin'>
                    <input className='num-1' placeholder='0'></input>
                    <input className='num-2' placeholder='0'></input>
                    <input className='num-3' placeholder='0'></input>
                    <input className='num-4' placeholder='0'></input>
                </div>
                
                

              
                
                <p className='font-sans text-xl'>Didn't receive the code? <Link to='/login' className='login-a'>Tap here to resend</Link></p>
                <button className='verify-btn'>Verify</button>
            </section>
            

        </div>
    );
};

export default MobileVerification;