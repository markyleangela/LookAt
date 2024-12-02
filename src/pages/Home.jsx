import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      
      <div className='h-screen bg-white flex items-center justify-center pb-48'>
        <div> 
          Home
        </div>
      </div>
    </>
  )
}

export default Home