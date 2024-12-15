import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom';
import UserApi from '../api/userApi';
import { useUser } from '../context/UserContext';  // Import the useUser hook

const Profile = () => {
  const { user, setUser } = useUser(); // Access the user data and setter function from context

  const [firstName, setFirstName] = useState(user?.firstName || ''); 
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [userId, setUserId] = useState(user?.userId || '');

  const [email, setEmail] = useState(user?.email || '');
  const [province, setProvince] = useState(user?.province || '');
  const [cityMunicipality, setCityMunicipality] = useState(user?.cityMunicipality || '');
  const [barangayLoc, setBarangayLoc] = useState(user?.barangayLoc || '');
  const [purok, setPurok] = useState(user?.purok || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Update state when user context changes
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserId(user.userId);
      setEmail(user.email);
      setProvince(user.province);
      setCityMunicipality(user.cityMunicipality);
      setBarangayLoc(user.barangayLoc);
      setPurok(user.purok);
    }
  }, [user]);  // This will trigger when the user context changes

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const updateData = {
      firstName,
      lastName,
      email,
      province,
      cityMunicipality,
      barangayLoc,
      purok,
    };
  
    try {
      const response = await UserApi.updateUser(userId, updateData);
      if (response) {
        setSuccessMessage('Profile updated successfully!');
        setErrorMessage('');
        console.log('Update response:', response);
        
        // After successful update, refresh the user context
        setUser({
          ...user,
          ...updateData, // Update context with the new data
        });
      } else {
        setErrorMessage('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Response error data:', error.response.data);
        setErrorMessage(`Error: ${error.response.data.message || 'Please try again later.'}`);
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };
  
  return (
    <>
      <Navbar title="Profile"/>
      <div>
        <div className="profile-page">
          <div className="profile-card">
            <form onSubmit={handleUpdate}>
              <div className="profile-header">
                <div className="profile-image-container">
                </div>
                <img
                  src="https://via.placeholder.com/100" 
                  alt="User"
                  className="profile-image"
                /> 
                <div className="profile-identity">
                  <h2>{firstName} {lastName}</h2>
                  <p>{userId}</p>  
                </div>
              </div>
              <div className="profile-info">
                <div className="left-profile">
                  <div className="info-row">
                    <label htmlFor="first_name" className='info-label'>First Name</label>
                    <input className='info-value'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="info-row">
                    <label htmlFor="email" className='info-label'>Email</label>
                    <input className='info-value'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="info-row">
                    <label htmlFor="address" className='info-label'>Municipality</label>
                    <input className='info-value'
                        value={cityMunicipality}
                        onChange={(e) => setCityMunicipality(e.target.value)}
                    />
                  </div>    

                  <div className="info-row">
                    <label htmlFor="address" className='info-label'>Purok</label>
                    <input className='info-value'
                        value={purok}
                        onChange={(e) => setPurok(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="right-profile">
                  <div className="info-row">
                    <label htmlFor="last_name" className='info-label'>Last Name</label>
                    <input className='info-value'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="info-row">
                    <label htmlFor="address" className='info-label'>Province</label>
                    <input className='info-value'
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                  </div>

                  <div className="info-row">
                    <label htmlFor="address" className='info-label'>Barangay</label>
                    <input className='info-value'
                        value={barangayLoc}
                        onChange={(e) => setBarangayLoc(e.target.value)}
                    />
                  </div>

                </div> 
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <button type="submit" className="update-button">Update Profile Information</button>  
            </form>
          </div>
        </div>  
      </div>
    </>
  );
};

export default Profile;
