import React from 'react';

const PurposeSection = ({ purpose, setPurpose }) => {
  const handleInputChange = (e) => {
    setPurpose(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[1000px] w-full px-4 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Specify what document you want to request for.</h2>

      {/* Purpose Input */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <input
          id="purpose"
          type="text"
          value={purpose}
          onChange={handleInputChange}
          placeholder="Job application"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>
    </div>
  );
};

export default PurposeSection;
