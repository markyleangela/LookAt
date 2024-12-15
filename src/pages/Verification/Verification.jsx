import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import './Verification.css';

const FirstVerification = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const stepElement = document.getElementById(`step-${currentLine}`);
        if (stepElement) {
            stepElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentLine]);

    const validationSchema = Yup.object({
        birthday: Yup.date()
            .required('Birthday is required')
            .test('age', 'You must be at least 18 years old', (value) => {
                if (!value) return false;
                const age = new Date().getFullYear() - new Date(value).getFullYear();
                return age >= 18;
            }),
        acceptedId: Yup.string().required('ID selection is required'),
        faceScan: Yup.string().required('Face scan confirmation is required'),
        confirmation: Yup.string().required('Confirmation is required'),
    });

    const handleNext = () => {
        if (currentLine < 3) {
            setCurrentLine((prevLine) => prevLine + 1);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const userId = 1; // Replace with actual user ID if needed
            // await updateUser(userId, values); // Uncomment and replace this with the actual API call
            navigate('/home');
        } catch (error) {
            console.error('Error submitting user:', error);
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
                        birthday: '',
                        acceptedId: '',
                        faceScan: '',
                        confirmation: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <div className="verification_content">
                                <h1>Tell us about yourself</h1>
                                <p>Please complete the information below.</p>

                                {/* Step 1: Birthday */}
                                {currentLine === 0 && (
                                    <div>
                                        <h2><label htmlFor="birthday">Birthday</label></h2>
                                        <Field
                                            type="date"
                                            id="birthday"
                                            name="birthday"
                                        />
                                        {errors.birthday && touched.birthday && (
                                            <div className="error-message">{errors.birthday}</div>
                                        )}
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
                                        </div>
                                        <Field
                                            type="text"
                                            name="faceScan"
                                            placeholder="Enter face scan confirmation"
                                        />
                                        {errors.faceScan && touched.faceScan && (
                                            <div className="error-message">{errors.faceScan}</div>
                                        )}
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
                                    </div>
                                )}
                            </div>

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
                                >
                                    Submit
                                </button>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default FirstVerification;
