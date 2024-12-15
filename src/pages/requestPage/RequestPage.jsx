import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PurposeSection from './RequestPage_01';
import AddressSection from './RequestPage_02';
import ReceivingSection from './RequestPage_03';
import DocumentType from './RequestPage_04';
import SummarySection from './RequestPage_05';

const DocumentRequestForm = () => {
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState(0); 

  const [purpose, setPurpose] = useState(localStorage.getItem('purpose'));

  const [region, setRegion] = useState(localStorage.getItem('region') || '');
  const [province, setProvince] = useState(localStorage.getItem('province') || '');
  const [city, setCity] = useState(localStorage.getItem('city') || '');
  const [barangay, setBarangay] = useState(localStorage.getItem('barangay') || '');

  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [middleName, setMiddleName] = useState(localStorage.getItem('middleName'));
  const [lastName, setLastName] = useState(localStorage.getItem('lastName'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [mobileNumber, setMobileNumber] = useState(localStorage.getItem('mobileNumber'));

  const [documents, setDocuments] = useState([]);
  const [isDocumentValid, setIsDocumentValid] = useState(false);

  // Next button logic
  const handleNext = () => {
    if (currentSection < 4) {
      setCurrentSection(currentSection + 1);
    }
  };

  // Prev button logic
  const handleBack = () => {

    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      localStorage.clear(); // Clear all data from localStorage
      navigate('/home'); // Navigate to home page when already on the first section
    }

  };

  // Submit request logic TO BE DONE
  const submit = () => {
    alert('Form submitted');
    localStorage.clear(); // Clear all data from localStorage
    navigate('/home');  // Navigate to home page after submitting
  }

  // Validation for each section
  const isPurposeValid = purpose;
  const isAddressValid = region && province && city && barangay;
  const isReceiverValid = firstName && middleName && lastName && mobileNumber;
  const isDocumentValidSection = documents.length > 0 && documents.every(formBox => formBox.certificateType && formBox.firstName && formBox.middleName && formBox.lastName);

  // Check if all fields are valid for the current section
  const isNextDisabled = () => {
    switch (currentSection) {
      case 0: // Purpose Section
        return !isPurposeValid;
      case 1: // Address Section
        return !isAddressValid;
      case 2: // Receiving Section
        return !isReceiverValid;
      case 3:
        return !isDocumentValidSection && !isDocumentValid;
      default:
        return false;
    }
  };

  const stepsArray = [
    <PurposeSection purpose={purpose} setPurpose={setPurpose} />,
    <AddressSection 
      region={region} 
      setRegion={setRegion} 
      province={province} 
      setProvince={setProvince}
      city={city} 
      setCity={setCity} 
      barangay={barangay} 
      setBarangay={setBarangay} 
    />,
    <ReceivingSection
      firstName={firstName}
      setFirstName={setFirstName}
      middleName={middleName}
      setMiddleName={setMiddleName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      mobileNumber={mobileNumber}
      setMobileNumber={setMobileNumber}
    />,
    <DocumentType 
      setDocuments={setDocuments}
      setIsDocumentValid={setIsDocumentValid}
    />,
    <SummarySection
      purpose={purpose}
      address={{ region, province, city, barangay }}
      receiver={{ firstName, middleName, lastName, email, mobileNumber }}
      documents={documents}
    />
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-[1000px] mx-auto p-6">
      {/* Stepper Progress Bar */}
      <div className="flex items-center w-full mb-6">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full mx-3 ${index <= currentSection ? 'bg-accent1' : 'bg-gray-300'} transition-colors duration-300`}
          />
        ))}
      </div>

      {/* Form content for the current section */}
      <div className="w-full flex justify-center">
        {stepsArray[currentSection]}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full mt-6 max-w-[1000px] mx-auto">
        <button
          onClick={handleBack}
          className="bg-accent1 hover:bg-accent2 text-white font-semibold py-2 px-4 rounded-full w-32"
        >
          Back
        </button>

        {/* Conditional button rendering */}
        {currentSection === 4 ? (
          <button
            onClick={submit} // Handle form submission logic here
            className="bg-accent2 hover:bg-opacity-50 text-white font-semibold py-2 px-4 rounded-full w-32"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`bg-accent1 text-white font-semibold py-2 px-4 rounded-full w-32 ${
              isNextDisabled() ? 'opacity-50' : 'hover:bg-accent2'
            }`}
            disabled={isNextDisabled()} // Disable based on section validation
          >
            Next
          </button>
        )}
      </div>

    </div>
  );
};

export default DocumentRequestForm;