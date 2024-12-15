import React from 'react';

const ReceivingSection = ({ firstName, setFirstName, middleName, setMiddleName, lastName, setLastName, email, setEmail, mobileNumber, setMobileNumber }) => {
  // Function to handle input changes and store values in localStorage
  const handleInputChange = (e, setter, storageKey) => {
    const value = e.target.value;
    setter(value);
    localStorage.setItem(storageKey, value); // Store value in localStorage
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[1000px] w-full px-4 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Specify your name (who will receive the requested file)</h2>
      
      {/* First Name */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <label htmlFor="firstName" className="text-md font-medium mb-2 text-left">First Name</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => handleInputChange(e, setFirstName, 'firstName')}
          placeholder="Juan"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>

      {/* Middle Name */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <label htmlFor="middleName" className="text-md font-medium mb-2 text-left">Middle Name</label>
        <input
          id="middleName"
          type="text"
          value={middleName}
          onChange={(e) => handleInputChange(e, setMiddleName, 'middleName')}
          placeholder="Garcia"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <label htmlFor="lastName" className="text-md font-medium mb-2 text-left">Last Name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => handleInputChange(e, setLastName, 'lastName')}
          placeholder="dela Cruz"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <label htmlFor="email" className="text-md font-medium mb-2 text-left">Email (optional)</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => handleInputChange(e, setEmail, 'email')}
          placeholder="delacruz.juangarcia@gmail.com"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>

      {/* Mobile Number */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <label htmlFor="mobileNumber" className="text-md font-medium mb-2 text-left">Mobile Number</label>
        <input
          id="mobileNumber"
          type="text"
          value={mobileNumber}
          onChange={(e) => handleInputChange(e, setMobileNumber, 'mobileNumber')}
          placeholder="09XXXXXXXXX"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>
    </div>
  );
};

export default ReceivingSection;
