import React from 'react';
import '../styles/Login.css';
import PersonGear from '../assets/person-gear.png';
import { Link } from 'react-router-dom';

const Login  = () =>  {
    return (
        <div className='login'>
            <section className='content'>
                
                <img src={PersonGear} alt="Icon" />
                <h1 className='font-sans text-xl'>LOGIN</h1>
                <label>User ID</label>
                <input className='user-id' placeholder='Enter your user ID'></input>
                <label>Password</label>
                <input className='password' placeholder='Enter your Password'></input>

              
                <button className='login-btn'>Log In</button>
                <p className='font-sans text-xl'>Don't have an account? <Link to='/signup' className='signup-a'>Sign Up</Link></p>
            
            </section>
            

        </div>
    );
};

export default Login;