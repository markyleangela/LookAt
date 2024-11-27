import React from 'react';
import '../styles/Signup.css';
import PersonGear from '../assets/person-gear.png';
import ArrowButton from '../assets/back-arrow.png';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Signup  = () =>  {
    return (
        <div className='login'>
            <header className='back-arrow'>
                <BackButton/>
            </header>
            <section className='content'>
                
                <img src={PersonGear} alt="Icon" />
                <h1 className='font-sans text-xl'>SIGN UP</h1>
                <label>Mobile Number</label>
                <input className='user-id' placeholder='Enter your Mobile Number'></input>
                <label>Password</label>
                <input className='password' placeholder='Enter your Password'></input>
                <label>Confirm Password</label>
                <input className='confirm-password' placeholder='Confirm Password'></input>

              
                <button className='login-btn'>Log In</button>
                <p className='font-sans text-xl'>Already have an account? <Link to='/login' className='login-a'>Log in</Link></p>
            
            </section>
            

        </div>
    );
};

export default Signup;