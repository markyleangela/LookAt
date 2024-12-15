import React from 'react';

const AddressSection = ({ region, setRegion, province, setProvince, city, setCity, barangay, setBarangay }) => {
  // Function to handle input changes and store values in localStorage
  const handleInputChange = (e, setter, storageKey) => {
    const value = e.target.value;
    setter(value);
    localStorage.setItem(storageKey, value); // Store value in localStorage
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[1000px] w-full px-4 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Specify the address of your barangay.</h2>

      {/* Region */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <label htmlFor="region" className="text-md font-medium mb-2 text-left">Region</label>
        <input
          id="region"
          type="text"
          value={region}
          onChange={(e) => handleInputChange(e, setRegion, 'region')}
          placeholder="Enter Region"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>

      {/* Province */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <label htmlFor="province" className="text-md font-medium mb-2 text-left">Province</label>
        <input
          id="province"
          type="text"
          value={province}
          onChange={(e) => handleInputChange(e, setProvince, 'province')}
          placeholder="Enter Province"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>

      {/* City */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <label htmlFor="city" className="text-md font-medium mb-2 text-left">Municipal or City</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => handleInputChange(e, setCity, 'city')}
          placeholder="Enter City"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>

      {/* Barangay */}
      <div className="flex flex-col w-full mb-4 max-w-md">
        <label htmlFor="barangay" className="text-md font-medium mb-2 text-left">Barangay</label>
        <input
          id="barangay"
          type="text"
          value={barangay}
          onChange={(e) => handleInputChange(e, setBarangay, 'barangay')}
          placeholder="Enter Barangay"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
        />
      </div>
    </div>
  );
};

export default AddressSection;
