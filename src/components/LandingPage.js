// src/components/LandingPage.js
import React from 'react';
import '../styles/LandingPage.css'; 
import Logo from '../assets/Logo.png'; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className='navbar'>
          <img src={Logo} alt="Logo" />
        </nav>
      <header>
        
     
        
      </header>
      <main>
        <section className="cta">
        <h3 className='statement-1'>Streamline Your <br/> Barangay <br/> Transactions<br/> with LookAt</h3>
        <p className='statement-2'>Experience fast, simple, and organized document processing. From applications to appointments, LookAt keeps everything at your fingertips.</p>
          <button className='get-started-btn'>Get Started</button>
          <p>Already have an account? <a href='' className='login-a'>Login</a></p>
        </section>
        
      </main>

      <footer>
        <p>© 2024 Our Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
