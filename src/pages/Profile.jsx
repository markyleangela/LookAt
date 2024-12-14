import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/Profile.css'

const Profile = () => {
  return (
    <>
      <Navbar title="Profile"/>
      <div>
        <div className="profile-page">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-image-container">
              </div>
              <img
                src="https://via.placeholder.com/100" 
                alt="User"
                className="profile-image"
              /> 
              <div className="profile-identity">
                <h2>Juan Dela Cruz</h2>
                <p>User ID</p>  
              </div>
            </div>

            {/* Profile Info */}
            <div className="profile-info">
              <div className="left-profile">
                <div className="info-row">
                  <label htmlFor="mobile_no" className='info-label'>Mobile Number</label>
                  <input type="text" value="0915XXXXXXX" className='info-value'/>
                  {/* <img src={editIcon} alt="Edit" className="edit-icon" /> */}
                </div>

                <div className="info-row">
                  <label htmlFor="email" className='info-label'>Email</label>
                  <input type="text" value="juandelacruz@gmail.com" className='info-value'/>
                  {/* <img src={editIcon} alt="Edit" className="edit-icon" /> */}
                </div>

                <div className="info-row">
                  <label htmlFor="address" className='info-label'>Municipality</label>
                  <input type="text" value="PUROK 1, Consolacion, CEBU, 6001" className='info-value'/>
                  {/* <img src={} alt="Edit" className="edit-icon" /> */}
                </div>  

                <div className="info-row">
                  <label htmlFor="address" className='info-label'>Purok</label>
                  <input type="text" value="PUROK 1, Consolacion, CEBU, 6001" className='info-value'/>
                  {/* <img src={} alt="Edit" className="edit-icon" /> */}
                </div>
              </div>
              
              <div className="right-profile">
                <div className="info-row">
                  <label htmlFor="birthdate" className='info-label'>Birthdate</label>
                  <input type="date" className='info-value' />
                  {/* <img src={editIcon} alt="Edit" className="edit-icon" /> */}
                </div>

                <div className="info-row">
                  <label htmlFor="address" className='info-label'>Province</label>
                  <input type="text" value="PUROK 1, Consolacion, CEBU, 6001" className='info-value'/>
                  {/* <img src={} alt="Edit" className="edit-icon" /> */}
                </div>

                <div className="info-row">
                  <label htmlFor="address" className='info-label'>Barangay</label>
                  <input type="text" value="PUROK 1, Consolacion, CEBU, 6001" className='info-value'/>
                  {/* <img src={} alt="Edit" className="edit-icon" /> */}
                </div>
                
                <div className="info-row">
                  <label htmlFor="address" className='info-label'>Zip Code</label>
                  <input type="text" value="PUROK 1, Consolacion, CEBU, 6001" className='info-value'/>
                  {/* <img src={} alt="Edit" className="edit-icon" /> */}
                </div>
              </div>
            </div>
            {/* Update Button */}
            <button className="update-button">Update Profile Information</button>
          </div>
        </div>  
      </div>
    </>
  )
}

export default Profile