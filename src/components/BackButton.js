// BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowButton from '../assets/back-arrow.png'; // Adjust the path as needed

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <button onClick={handleBackClick} className="arrow-btn">
            <img src={ArrowButton} alt="Back" />
        </button>
    );
};

export default BackButton;
