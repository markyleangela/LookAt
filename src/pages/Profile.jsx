import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/Profile.css'
import { Link, useNavigate } from 'react-router-dom';
import UserApi from '../api/userApi';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');

  const [mobileNumber, setMobileNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [barangay, setBarangay] = useState('');
  const [purok, setPurok] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await UserApi.getUser(); 
            if (response.status === 200) {
                const userData = response.data;
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setUserId(userData.userId);

                setMobileNumber(userData.mobileNumber);
                setBirthdate(userData.birthdate);
                setEmail(userData.email);
                setProvince(userData.province);
                setMunicipality(userData.municipality);
                setBarangay(userData.barangay);
                setPurok(userData.purok);
                setZipCode(userData.zipCode);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
    // const mockUserData = {
    //   firstName: 'Karylle',
    //   lastName: 'Delos Reyes',
    //   userId: '12345',
    // };

    // setFirstName(mockUserData.firstName);
    // setLastName(mockUserData.lastName);
    // setUserId(mockUserData.userId);
  }, []);

  const handleUpdate = async (e) => {
      e.preventDefault();

      if (!mobileNumber || !birthdate || ! email || !province || !municipality || !barangay || !purok || !zipCode) {
          setErrorMessage('Please enter valid user data.');
          return;
      }

      const updateData = {
          mobileNumber,
          birthdate,
          email,
          province,
          municipality, 
          barangay, 
          purok, 
          zipCode
      };

      try {
        const response = await UserApi.updateUser(updateData);

        if (response.status === 200) {
          setSuccessMessage('Profile updated successfully!');
          setErrorMessage('');
          console.log('Update response:', response.data);
          navigate('/profile')
        } else {
          setErrorMessage('Failed to update profile. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Something went wrong. Please try again later.');
        console.error('Error updating profile:', error);
      }
  };


  return (
    <>
      <Navbar title="Profile"/>
      <div>
        <div className="profile-page">
          {/* Profile Card */}
          <div className="profile-card">
            <form action="" onSubmit={handleUpdate}>
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
            {/* Profile Info */}
              <div className="profile-info">
                <div className="left-profile">
                  <div className="info-row">
                    <label htmlFor="mobile_no" className='info-label'>Mobile Number</label>
                    <input className='info-value'
                        // placeholder='Enter your user ID'
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
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
                        value={municipality}
                        onChange={(e) => setMunicipality(e.target.value)}
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
                    <label htmlFor="birthdate" className='info-label'>Birthdate</label>
                    <input className='info-value'
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
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
                        value={barangay}
                        onChange={(e) => setBarangay(e.target.value)}
                    />
                  </div>
                  
                  <div className="info-row">
                    <label htmlFor="address" className='info-label'>Zip Code</label>
                    <input className='info-value'
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div> 
              </div>
              {/* Update Button */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <button type="submit" className="update-button">Update Profile Information</button>  
            </form>
          </div>
        </div>  
      </div>
    </>
  )
}

export default Profile