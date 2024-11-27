import React from 'react';
import '../styles/AccountCreated.css';
import PersonCheck from '../assets/person-check.png';
import { Link } from 'react-router-dom';
import ArrowButton from '../assets/back-arrow.png';
import BackButton from '../components/BackButton';

const AccountCreated  = () =>  {
    return (
        <div className='ac'>
            <header className='back-arrow'>
                    <BackButton />
            </header>
            <section className='content-ac'>
                
                <img src={PersonCheck} alt="Icon" />
                <h1 className='font-sans text-xl'>Account Created</h1>
                <h1 className='font-sans text-xl'>Successfully</h1>
                <p>You can now proceed to </p>
                
                

              
                

                <Link to="/login" className='login-link-ac'>
                    <button className='login-btn-ac'>Log in</button>
                </Link>
            </section>
            

        </div>
    );
};

export default AccountCreated;