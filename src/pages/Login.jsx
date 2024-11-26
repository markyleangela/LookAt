import React from 'react';
import '../styles/Login.css'
import PersonGear from '../assets/person-gear.png'


const Login  = () =>  {
    return (
        <div className='login'>
            <section className='content'>
                
                <img src={PersonGear} alt="Icon" />
                <h1>LOGIN</h1>
                <label>User ID</label>
                <input className='user-id' placeholder='Enter your user ID'></input>
                <label>Password</label>
                <input className='password' placeholder='Enter your Password'></input>
            </section>
            <section className='cta'>
                <button className='login-btn'>Log In</button>
                <p>Don't have an account? <a href='' className='signup-a'>Sign Up</a></p>
            </section>

        </div>
    );
};

export default Login;