import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../../context/UserContext';

const FirstVerification = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
      const { user } = useUser(); // Access user data from context

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

    const handlePrev = () => {
        if (currentLine > 0) {
            setCurrentLine((prevLine) => prevLine - 1);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const userId = 1; // Replace with actual user ID if needed
            // await updateUser(userId, values); // Uncomment and replace this with the actual API call
            navigate(`/${user.userId}/home`);
        } catch (error) {
            console.error('Error submitting user:', error);
            setSubmitting(false);
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
                                    ? 'bg-accent2'  // All steps are complete
                                    : index <= currentLine 
                                    ? 'bg-accent1'  // Steps up to the current step
                                    : 'bg-gray-300' // Steps after the current step
                            }`}
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
                            <div className="flex flex-col w-full mt-3 gap-2">
                                <h1 className="font-bold text-2xl">Tell us about yourself</h1>
                                <p className="text-md text-black">Please complete the information below.</p>

                                {/* Step 1: Birthday */}
                                {currentLine === 0 && (
                                    <div>
                                        <h2 className="text-2xl text-accent1 font-bold"><label htmlFor="birthday">Birthday</label></h2>
                                        <Field
                                            type="date"
                                            id="birthday"
                                            name="birthday"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                        />
                                        {errors.birthday && touched.birthday && (
                                            <div className="text-red-600 text-sm">{errors.birthday}</div>
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
                                        <Field as="select" name="acceptedId" className="w-full p-2 border border-gray-300 rounded-md mt-4">
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
                                            <div className="text-red-600 text-sm">{errors.acceptedId}</div>
                                        )}
                                        
                                        <hr className="w-full h-[5px] bg-accent1 mt-2" />
                                    </div>
                                )}

                                {/* Step 3: Face Scan */}
                                {currentLine === 2 && (
                                    <div>
                                        <h2 className="text-2xl text-accent1 font-bold">Scan Face</h2>
                                        <p>Please fit your face in the frame.</p>
                                        <div className="my-5 flex justify-center">
                                            <img 
                                                src={require('../../assets/camera_frame.png')} 
                                                alt="Camera Frame" 
                                                className="w-full max-w-xs"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <Field
                                                type="text"
                                                name="faceScan"
                                                placeholder="Enter face scan confirmation"
                                                className="w-full max-w-xs p-2 border border-gray-300 rounded-md"
                                            />
                                            {errors.faceScan && touched.faceScan && (
                                                <div className="text-red-600 text-sm">{errors.faceScan}</div>
                                            )}
                                        </div>
                                        <hr className="w-full h-[5px] bg-accent1 mt-2" />
                                    </div>
                                )}

                                {/* Step 4: Confirmation */}
                                {currentLine === 3 && (
                                    <div>
                                        <h2 className="text-2xl text-accent2 font-bold">Congratulations!</h2>
                                        <p className="text-md">You are now in line for verification, a confirmation message will be sent as soon as possible.</p>
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
