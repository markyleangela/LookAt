import React from 'react';
import { Link } from 'react-router-dom';

const UserOrBarangay = () => {
    return (
        <div className='h-screen w-screen bg-accent1 flex flex-col gap-10 p-10'>
            <div className='w-full h-1/5 text-6xl text-center text-white font-bold'>
                <h2>Sign Up as...</h2>
            </div>
            <div className='w-full h-4/5 flex gap-10'>
                <div className='flex-1 bg-accent2 hover:bg-opacity-50 rounded-lg h-4/5'>
                    <Link to="/register">
                        <button className='w-full h-full flex lg:flex-col items-center md:flex-row sm:flex-row'>
                            <svg className='w-full h-4/5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.5 17H4C3.44772 17 3 16.5523 3 16C3 14.3431 4.34315 13 6 13H7M7 9.94999C5.85888 9.71836 5 8.70948 5 7.5C5 6.11929 6.11929 5 7.5 5C8.06291 5 8.58237 5.18604 9.00024 5.5M19.5002 17H20.0002C20.5525 17 21.0002 16.5523 21.0002 16C21.0002 14.3431 19.6571 13 18.0002 13H17.0002M17.0002 9.94999C18.1414 9.71836 19.0002 8.70948 19.0002 7.5C19.0002 6.11929 17.881 5 16.5002 5C15.9373 5 15.4179 5.18604 15 5.5M15.5 19H8.5C7.94771 19 7.5 18.5523 7.5 18C7.5 16.3431 8.84314 15 10.5 15H13.5C15.1569 15 16.5 16.3431 16.5 18C16.5 18.5523 16.0523 19 15.5 19ZM14.5 9.5C14.5 10.8807 13.3807 12 12 12C10.6193 12 9.5 10.8807 9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <span className='h-1/5 text-5xl text-white flex items-center justify-center lg:pr-0 md:pr-12'>User</span>
                        </button>
                    </Link>
                </div>
                <div className='flex-1 bg-accent2 hover:bg-opacity-50 rounded-lg h-4/5'>
                    <Link to="/barangay/register">
                    <button className='w-full h-full flex lg:flex-col items-center md:flex-row'>
                            <svg className='w-full h-4/5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 21.0001H21M4 18.0001H20M6 10.0001L6 18.0001M10 10.0001L10 18.0001M14 10.0001L14 18.0001M18 10.0001L18 18.0001M4 9.50012V8.54481C4 8.20524 4.17233 7.88887 4.45761 7.70468L11.4576 3.18551C11.7878 2.97234 12.2122 2.97234 12.5424 3.1855L19.5424 7.70468C19.8277 7.88887 20 8.20524 20 8.54481V9.50012C20 9.77626 19.7761 10.0001 19.5 10.0001H4.5C4.22386 10.0001 4 9.77626 4 9.50012Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            <span className='h-1/5 text-5xl text-white flex items-center justify-center lg:pr-0 md:pr-12'>Barangay</span>
                        </button>
                    </Link>
                </div>
            </div>
           
        </div>
    );
};

export default UserOrBarangay;
