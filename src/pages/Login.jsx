import React from 'react';
import '../styles/Login.css';
import PersonGear from '../assets/person-gear.png';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Login  = () =>  {
    return (
        <div className='login'>
            <header className='back-arrow'>
                <BackButton/>
            </header>
            <section className='content'>
                
                <img src={PersonGear} alt="Icon" />
                <h1 className='font-sans text-xl'>Log In</h1>
                <label>User ID</label>
                <input className='user-id' placeholder='Enter your user ID'></input>
                <label>Password</label>
                <input className='password' placeholder='Enter your Password'></input>
                <Link to='/signup' className='forgot-pass'><label>Forgot password?</label></Link>
              
                <button className='login-btn'>Log In</button>
                <p className='font-sans text-xl'>Don't have an account? <Link to='/signup' className='signup-a'>Sign up here</Link></p>
            
            </section>
            

        </div>
    );
};

export default Login;