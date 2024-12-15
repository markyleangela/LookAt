import React from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext'; // Import the user context

const Home = () => {
  const { user } = useUser(); // Access the user data from context

  return (
    <>
      <Navbar />

      <div className="h-screen bg-white flex items-center justify-center pb-48">
        <div>
          <h1>Home</h1>
          {user ? (
            <p>Welcome back, {user.firstName}!</p> // Display the user's name if logged in
          ) : (
            <p>Please log in to access more features.</p> // Message if not logged in
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
