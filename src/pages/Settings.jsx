import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/Settings.css'

const Settings = () => {
  return (
    <>
      <Navbar title="Settings"/>
      <div>
        <div className="settings-page">
            <div className="settings-card">
                <div className="settings-sidebar">
                <h2>ACCOUNT SETTINGS</h2>
                <ul>
                    <li className="active">Change Password</li>
                    <li>Log Out</li>
                </ul>
                <h2>GENERAL SETTINGS</h2>
                <ul>
                    <li>App Appearance</li>
                    <li>Notifications</li>
                </ul>
                </div>
                <div className="settings-content">
                <h1>Change Password</h1>
                <form className="password-form">
                    <label>
                    Old Password:
                    <input type="password" placeholder="Enter old password" />
                    </label>
                    <label>
                    New Password:
                    <input type="password" placeholder="Enter new password" />
                    </label>
                    <label>
                    Confirm New Password:
                    <input type="password" placeholder="Confirm new password" />
                    </label>
                    <button type="submit" className="update-password-btn">
                    Update Password
                    </button>
                </form>
                </div>
            </div>
        </div>
        
      </div>
    </>
  )
}

export default Settings