import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import './Verification.css';
import UserApi from '../../api/userApi';
import { useUser } from '../../context/UserContext';

const FirstVerification = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, setUser } = useUser();

    useEffect(() => {
        const stepElement = document.getElementById(`step-${currentLine}`);
        if (stepElement) {
            stepElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentLine]);

    const validationSchema = Yup.object({
        date: Yup.date()
            .required('Birthdate is required')
            .test('age', 'You must be at least 18 years old', (value) => {
                if (!value) return false;
                const age = new Date().getFullYear() - new Date(value).getFullYear();
                return age >= 18;
            }),
        acceptedId: Yup.string().required('ID selection is required'),
        faceScan: Yup.string().required('Face scan confirmation is required'),
        confirmation: Yup.boolean().oneOf([true], 'You must confirm the details') // Changed to a checkbox validation
    });

    const handleNext = () => {
        if (currentLine < 3) {
            setCurrentLine((prevLine) => prevLine + 1);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("Form is being submitted", values);  // Debugging the form submission

        try {
            const response = await UserApi.updateUser(user.userId, values);
            console.log(response.data); // Log the response from API
            alert('Verification submitted successfully');
            navigate('/home');
        } catch (error) {
            console.error('Error submitting user:', error);
            alert('Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

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

                <Formik
                    initialValues={{
                        date: '',
                        acceptedId: '',
                        faceScan: '',
                        confirmation: false, // Default to false
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            {/* Previous code remains the same */}
                            <div className="verification_content">
                                <h1>Tell us about yourself</h1>
                                <p>Please complete the information below.</p>

                                {/* Step 1: date */}
                                {currentLine === 0 && (
                                    <div>
                                        <h2><label htmlFor="date">Birthdate</label></h2>
                                        <Field
                                            type="date"
                                            id="date"
                                            name="date"
                                        />
                                        {errors.date && touched.date && (
                                            <div className="error-message">{errors.date}</div>
                                        )}
                                        <hr className="age-line"></hr>
                                    </div>
                                )}

                                {/* Step 2: Accepted IDs */}
                                {currentLine === 1 && (
                                    <div>
                                        <div className="header-container">
                                            <h2>Accepted IDs</h2>
                                            <img 
                                                src={require('../../assets/accepted_id.png')} 
                                                alt="Accepted IDs" 
                                                className="accepted-id-image" 
                                            />
                                        </div>
                                        <p>Get verified faster, all on the app.</p>
                                        <div className="verification_ID">
                                            <Field as="select" name="acceptedId">
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
                                            </Field>
                                            {errors.acceptedId && touched.acceptedId && (
                                                <div className="error-message">{errors.acceptedId}</div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Face Scan */}
                                {currentLine === 2 && (
                                    <div>
                                        <h2>Scan Face</h2>
                                        <p>Please fit your face in the frame.</p>
                                        <div className="image-container">
                                            <img 
                                                src={require('../../assets/camera_frame.png')} 
                                                alt="Camera Frame" 
                                                className="camera_frame_image" 
                                            />
                                            <div className="placeholder_scan">
                                                <Field
                                                    type="text"
                                                    name="faceScan"
                                                    placeholder="Enter face scan confirmation"
                                                />
                                                {errors.faceScan && touched.faceScan && (
                                                    <div className="error-message">{errors.faceScan}</div>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                )}

                            {/* Step 4: Confirmation */}
                            {currentLine === 3 && (
                                <div>
                                    <h2 style={{ color: "#0AD1C8" }}>Congratulations!</h2>
                                    <p className="congratulations-text">You are now in line for verification, a confirmation message will be sent as soon as possible.</p>
                                    <div className="image-container">
                                        <img 
                                            src={require('../../assets/congratulation_image.png')} 
                                            alt="Done" 
                                            className="congratulation_image" 
                                        />
                                    </div>
                                    
                                    {/* Add confirmation checkbox */}
                                    <div>
                                        <Field 
                                            type="checkbox" 
                                            name="confirmation" 
                                            id="confirmation"
                                        />
                                        <label htmlFor="confirmation">I confirm all details are correct</label>
                                        {errors.confirmation && touched.confirmation && (
                                            <div className="error-message">{errors.confirmation}</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Button for each step */}
                            {currentLine !== 3 && (
                                <button 
                                    type="button" 
                                    className="next_button"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            )}

                            {/* Only show submit button on last slide */}
                            {currentLine === 3 && (
                                <button
                                    type="submit"
                                    className="submit_button"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                            )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default FirstVerification;