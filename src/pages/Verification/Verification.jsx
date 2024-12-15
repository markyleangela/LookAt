import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import './Verification.css';

const FirstVerification = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const [birthday, setBirthday] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
    if (currentLine < 3) {
        setCurrentLine((prevLine) => (prevLine + 1) % 4);
    } else {
        navigate('/home');
    }
};

    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const age = birthday ? calculateAge(birthday) : null;

    return (
        <>
            <Navbar title="Verification" />
            <div className="verification-container">
                <div className="line-container">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className={`line ${currentLine === 3 ? 'all-highlighted' : (currentLine === index ? 'highlighted' : '')}`}
                        ></div>
                    ))}
                </div>
                <div className="verification_content">
                    <h1>Tell us about yourself</h1>
                    <p>Please complete the information below.</p>
                    {currentLine === 0 && (
                        <div>
                            <h2><label htmlFor="birthday">Birthday</label></h2>
                            <input
                                type="date"
                                id="birthday"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                            <br />
                            <div className="age-verification">
                                {age !== null && age < 18 && (
                                    <span>You should be 18+ to verify</span>
                                )}
                                <hr className="age-line" />
                            </div>
                        </div>
                    )}
                    {currentLine === 1 && (
                        <div>
                            <div className="header-container">
                                <h2>Accepted IDs</h2>
                                <img src={require('../../assets/accepted_id.png')} alt="Accepted IDs" className="accepted-id-image" />
                            </div>
                            <p>Get verified faster, all on the app.</p>
                            <hr className="age-line" />
                            <div className="verification_ID">
                                <ul>
                                    <li>
                                        National ID (Card Type)
                                        <span className="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                    <li>
                                        ePhil ID / Digital National ID
                                        <span className="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                    <li>
                                        Driver’s License
                                        <span className="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                    <li>
                                        UMID
                                        <span className ="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                    <li>
                                        Postal ID
                                        <span className="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                    <li>
                                        Passport
                                        <span className="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                    <li>
                                        SSS ID
                                        <span className="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                    <li>
                                        PRC ID
                                        <span className="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                    <li>
                                        HDMF (Pag-IBIG ID)
                                        <span className="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                    <li>
                                        Student ID
                                        <span className="vector-icon">➔</span>
                                    </li>
                                    <hr className="list-line" />
                                </ul>
                            </div>
                        </div>
                    )}
                    {currentLine === 2 && (
                        <div>
                            <h2>Scan Face</h2>
                            <p>Please fit your face in the frame.</p>
                            <hr className="age-line" />
                            <div className="image-container">
                                <img src={require('../../assets/camera_frame.png')} alt="Camera Frame" className="camera_frame_image" />
                            </div>
                        </div>
                    )}
                    {currentLine === 3 && (
                        <div>
                            <h2 style={{ color: "#0AD1C8" }}>Congratulations!</h2>
                            <p className="congratulations-text">You are now in line for verification, a confirmation message will be sent as soon as possible.</p>
                            <hr className="age-line" />
                            <div className="image-container">
                                <img src={require('../../assets/congratulation_image.png')} alt="Done" className="congratulation_image" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button 
                className={`next_button ${currentLine === 3 ? 'submit_button' : ''}`} 
                onClick={handleNext}
            >
                {currentLine === 3 ? 'Submit' : 'Next'}
            </button>
        </>
    );
};

export default FirstVerification;