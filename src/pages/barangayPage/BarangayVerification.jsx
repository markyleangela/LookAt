import React, { useState, useEffect, useContext } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useParams } from 'react-router-dom';
import { BarangayContext } from '../../context/BarangayContext';
import userApi from '../../api/userApi'; // Import the API for fetching users

const BarangayVerification = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const { barangayData, fetchBarangay, error } = useContext(BarangayContext);

  useEffect(() => {
    if (id && !barangayData) {
      fetchBarangay(id);
    }
  }, [id, barangayData, fetchBarangay]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (barangayData?.barangayLoc) {
          console.log(barangayData.barangayLoc);
          const fetchedUsers = await userApi.getAllUsers();
          console.log(fetchedUsers.data); // Check if this is an array
  
          // Ensure fetchedUsers.data is an array before filtering
          if (Array.isArray(fetchedUsers.data)) {
            const filteredUsers = fetchedUsers.data.filter(user => 
              user.barangayLoc.trim().toLowerCase() === barangayData.barangayLoc.trim().toLowerCase() && 
              !user.isVerified  // Only include unverified users
            );
            console.log(filteredUsers);  // Log filtered users
            setUsers(filteredUsers);
          } else {
            console.error('Fetched users are not in an array format');
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [barangayData]);

  const handleVerify = async (userId) => {
    try {
      // Include barangayId in the update request
      const updatedUser = await userApi.updateUser(userId, { 
        isVerified: true, 
        barangayId: barangayData.barangayId  // Add barangayId here
      });
      
      // Update the state with the verified user
      setUsers(users.map(user => 
        user.userId === userId ? { ...user, isVerified: true } : user
      ));
      
      console.log('User verified:', updatedUser);
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!barangayData) {
    return <div>Loading...</div>;
  }

  // Card component for each user
  const UserCard = ({ user }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between items-center hover:scale-105 transform transition duration-200 ease-in-out min-h-80 w-60 mx-5 border border-gray-300">
      <div className="bg-accent2 h-10 w-full rounded-t-md flex items-center justify-center">
        <p className="text-white text-md font-semibold">User ID: {user.userId}</p>
      </div>
      <div className="flex flex-col justify-center items-center flex-1 mt-4">
        <p className="font-semibold text-lg">Name: {user.name}</p>
        <p className="text-sm mt-2">Email: {user.email}</p>
        <p className="text-sm mt-2">Barangay: {user.barangayLoc}</p>
        <p className={`text-sm mt-2 ${!user.isVerified ? "text-red-500" : "text-green-600"}`}>
          {user.isVerified ? "Verified" : "Not Verified"}
        </p>
      </div>
      <button
        onClick={() => handleVerify(user.userId)}
        className="mt-4 px-4 py-2 bg-accent1 text-white rounded shadow hover:bg-accent1-dark transition duration-300"
      >
        Verify
      </button>
    </div>
  );

  return (
    <div className="flex h-screen">
      <AdminNavbar barangayData={barangayData} />
      <div className="flex flex-1 flex-col bg-gray-50 p-8">
        <div className="text-2xl font-semibold text-gray-700 mb-4">
          Barangay User Verification
        </div>
        <div className="flex flex-wrap">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))
          ) : (
            <p className="text-gray-600">No unverified users found in this Barangay.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarangayVerification;
