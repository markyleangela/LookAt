// src/components/LandingPage.js
import React from 'react';
import '../styles/LandingPage.css';
import Logo from '../assets/Logo.png';
import {Link} from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <nav className='navbar'>
          <img src={Logo} alt="Logo" />
        </nav>
      </header>
      <main>
        <section className="cta">
          <h3 className='statement-1'>Streamline Your Barangay Transactions with LookAt</h3>
          <hr />
          <p className='statement-2'>Experience fast, simple, and organized document processing. From applications to appointments, LookAt keeps everything at your fingertips.</p>
          <Link to="/register">
            <button className='get-started-btn'>Get Started</button>
          </Link>
          <p className='already-have-account'>Already have an account? <Link to="/login" className='login-a'>Login</Link></p>
        </section>
      </main>

      <footer>
      
      </footer>
    </div>
  );
};

export default LandingPage;
