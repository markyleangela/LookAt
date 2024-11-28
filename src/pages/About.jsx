import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
  // State to store the users
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users when the component mounts
  useEffect(() => {
    axios.get('/api/User')  // Replace with the correct API endpoint
      .then((response) => {
        setUsers(response.data);  // Store users in state
        setLoading(false);  // Set loading to false when done
      })
      .catch((error) => {
        setError('Failed to fetch users');  // Handle error
        setLoading(false);  // Set loading to false on error
      });
  }, []);  // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='flex items-center justify-center'>
      <h1>About</h1>
      <h2>List of Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}  {user.userId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
