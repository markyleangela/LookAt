import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();

  const steps = [
    { name: 'Step 1:', message: 'Select purpose of appointment' },
    { name: 'Step 2:', message: 'Select your region, province, city, and barangay' },
    { name: 'Step 3:', message: 'Provide your name, email(optional), and working mobile number' },
    { name: 'Step 4:', message: 'Input the type of certificate or document to process. Provide necessary details of the person you are requesting for' },
    { name: 'Step 5:', message: 'Review important details of your request. Double-check if name, address, email, and mobile number are accurate' },
    { name: 'Step 6:', message: 'Claim requested document if request progress indicates the document is ready. Note: If requesting for someone else, prepare an authorization letter upon claiming the document' },
  ];

  const renderSteps = (className = '') => {
    return steps.map((s, index) => (
      <div
        key={index}
        className={`mb-4 ${className} flex border-accent1 border-2 rounded-lg w-full`}
      >
        <div className="bg-accent1 text-white px-4 py-2 font-bold flex items-center text-sm md:text-md lg:text-md rounded-l-md w-1/5">
          {s.name}
        </div>
        <div className="text-accent1 px-4 py-2 text-sm md:text-md lg:text-md w-4/5">
          {s.message}
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar title="Help" />
      <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div
          className="
            flex flex-col
            w-full sm:w-11/12 md:w-3/4 lg:w-1/2
            space-y-6
          "
        >
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-accent1">
            Welcome to Lookat
          </h1>
          <p className="text-sm sm:text-md md:text-lg lg:text-xl">
            Steps to take in filling the request:
          </p>
          <div className="w-full">{renderSteps()}</div>
          <button
            onClick={() => navigate('/about')}
            className="
              bg-accent1 text-white text-sm sm:text-md md:text-lg lg:text-xl
              px-3 py-2  md:px-6 md:py-2 lg:px-8 lg:py-2
              mt-4 w-full rounded-lg hover:bg-opacity-80
            "
          >
            Start Request
          </button>
        </div>
      </div>
    </>
  );
};

export default Help;
