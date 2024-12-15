import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import userApi from '../../api/userApi';

const FirstVerification = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const [formData, setFormData] = useState({
        date: '',
        idType: '',
        physicalIdNumber: '',
        confirmation: '',
        barangayLoc: '',
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { user } = useUser(); // Access user data from context
    const { id } = useParams();

    useEffect(() => {
        const stepElement = document.getElementById(`step-${currentLine}`);
        if (stepElement) {
            stepElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentLine]);

    const validate = () => {
        const newErrors = {};

        if (currentLine === 0) {
            if (!formData.date) {
                newErrors.date = 'Date of birth is required';
            } else {
                const age = new Date().getFullYear() - new Date(formData.date).getFullYear();
                if (age < 18) {
                    newErrors.date = 'You must be at least 18 years old';
                }
            }
        }

        if (currentLine === 1 && !formData.idType) {
            newErrors.idType = 'ID type selection is required';
        }

        if (currentLine === 2 && !formData.physicalIdNumber) {
            newErrors.physicalIdNumber = 'Physical ID number is required';
        }

        if (currentLine === 3 && !formData.confirmation) {
            newErrors.confirmation = 'Confirmation is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            setCurrentLine((prevLine) => prevLine + 1);
        }
    };

    const handlePrev = () => {
        if (currentLine > 0) {
            setCurrentLine((prevLine) => prevLine - 1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit button clicked');
        console.log('Form submitted with values:', formData);
        try {
            const response = await userApi.updateUser(id, formData);
            console.log(response);
            console.log('Navigating to home...');
            navigate(`/${id}/home`);
        } catch (error) {
            console.error('Error submitting user:', error);
        }
    };

    return (
        <>
            <Navbar title="Verification" />
            <div className="flex flex-col mx-auto w-1/2 max-w-screen-2xl p-5 overflow-x-hidden">
                <div className="flex justify-center w-full">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-1/2 h-2 mx-1 rounded-full ${
                                currentLine === 3
                                    ? 'bg-accent2'
                                    : index <= currentLine
                                    ? 'bg-accent1'
                                    : 'bg-gray-300'
                            }`}
                        ></div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full mt-3 gap-2">
                        <h1 className="font-bold text-2xl">Tell us about yourself</h1>
                        <p className="text-md text-black">Please complete the information below.</p>

                        {/* Step 1: date */}
                        {currentLine === 0 && (
                            <div>
                                <h2 className="text-2xl text-accent1 font-bold"><label htmlFor="date">Birthdate</label></h2>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                                {errors.date && (
                                    <div className="text-red-600 text-sm">{errors.date}</div>
                                )}
                                <hr className="w-full h-[5px] bg-accent1 mt-2" />
                            </div>
                        )}

                        {/* Step 2: Accepted IDs */}
                        {currentLine === 1 && (
                            <div>
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl text-accent1 font-bold">Accepted IDs</h2>
                                    <img
                                        src={require('../../assets/accepted_id.png')}
                                        alt="Accepted IDs"
                                        className="w-9 h-9 shadow-md"
                                    />
                                </div>
                                <p className="text-md">Get verified faster, all on the app.</p>
                                <select
                                    name="idType"
                                    value={formData.idType}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md mt-4"
                                >
                                    <option value="">Select ID</option>
                                    <option value="National ID">National ID</option>
                                    <option value="ePhil ID">ePhil ID</option>
                                    <option value="Driver's License">Driver's License</option>
                                    <option value="UMID">UMID</option>
                                    <option value="Postal ID">Postal ID</option>
                                    <option value="Passport">Passport</option>
                                    <option value="SSS ID">SSS ID</option>
                                    <option value="PRC ID">PRC ID</option>
                                    <option value="HDMF">HDMF (Pag-IBIG ID)</option>
                                    <option value="Student ID">Student ID</option>
                                </select>
                                {errors.idType && (
                                    <div className="text-red-600 text-sm">{errors.idType}</div>
                                )}

                                <hr className="w-full h-[5px] bg-accent1 mt-2" />
                            </div>
                        )}

                        {/* Step 3: Physical ID Number */}
                        {currentLine === 2 && (
                        <div>
                            <h2 className="text-2xl text-accent1 font-bold">Physical ID Number</h2>
                            <p>Please input the physical ID number from your selected ID.</p>
                            <div className="my-5 flex justify-center">
                                <input
                                    type="text"
                                    name="physicalIdNumber"
                                    value={formData.physicalIdNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Physical ID Number"
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md"
                                />
                                {errors.physicalIdNumber && (
                                    <div className="text-red-600 text-sm">{errors.physicalIdNumber}</div>
                                )}
                            </div>

                            {/* New field for Barangay Location */}
                            <h2 className="text-2xl text-accent1 font-bold">Barangay Location</h2>
                            <p>Please enter your Barangay location.</p>
                            <div className="my-5 flex justify-center">
                                <input
                                    type="text"
                                    name="barangayLoc"
                                    value={formData.barangayLoc}
                                    onChange={handleChange}
                                    placeholder="Enter Barangay Location"
                                    className="w-full max-w-xs p-2 border border-gray-300 rounded-md"
                                />
                                {errors.barangayLoc && (
                                    <div className="text-red-600 text-sm">{errors.barangayLoc}</div>
                                )}
                            </div>

                            <hr className="w-full h-[5px] bg-accent1 mt-2" />
                        </div>
                    )}


                        {/* Step 4: Confirmation */}
                        {currentLine === 3 && (
                            <div>
                                <h2 className="text-2xl text-accent2 font-bold">Congratulations!</h2>
                                <p className="text-md">You are now in line for verification, a confirmation message will be sent as soon as possible. Please click Submit.</p>
                                <div className="my-5 flex justify-center">
                                    <img
                                        src={require('../../assets/congratulation_image.png')}
                                        alt="Done"
                                        className="w-full max-w-xs"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Step-specific button layout */}
                    <div className={`flex ${currentLine === 0 ? 'justify-end' : 'justify-between'} mt-4`}>
                        {/* Show Previous button if not on the first step */}
                        {currentLine > 0 && (
                            <button
                                type="button"
                                className="bg-accent1 hover:bg-accent2 text-white font-semibold py-2 px-8 rounded-full"
                                onClick={handlePrev}
                            >
                                Previous
                            </button>
                        )}

                        {/* Show Next button if not on the last step */}
                        {currentLine !== 3 && (
                            <button
                                type="button"
                                className="bg-accent1 hover:bg-accent2 text-white font-semibold py-2 px-8 rounded-full"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        )}

                        {/* Show Submit button only on the last step */}
                        {currentLine === 3 && (
                            <button
                                type="submit"
                                className="bg-accent2 hover:bg-teal-500 text-white font-semibold py-2 px-8 rounded-full"
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default FirstVerification;