import React, { useContext, useEffect } from 'react';
import { RequestContext } from './RequestContext';

const DocumentType = ({ setIsDocumentValid }) => {
  const { formBoxes, addFormBox, removeFormBox, handleInputChange } = useContext(RequestContext);

  // Validation: Ensure all fields are filled for at least one document form before adding a new one
  const isValid = formBoxes.every(formBox => formBox.certificateType && formBox.firstName && formBox.middleName && formBox.lastName);

  // Use effect to notify RequestPage about the isValid status
  useEffect(() => {
    setIsDocumentValid(isValid);
  }, [isValid, setIsDocumentValid]);

  return (
    <div className="flex flex-col items-center justify-start max-w-[1000px] w-full px-4 mx-auto">
      <div className="w-full px-10 py-3 mb-1 text-left text-md font-bold text-accent1 border-2 border-accent1 rounded-lg">
        <ul className="list-disc">
          <li>Specify the details for the certificate/documents you are requesting for.</li>
          <li>If requesting for someone else, prepare an authorization letter upon claiming the document</li>
        </ul>
      </div>

      <div className="w-full flex flex-col items-center mb-2">
        {formBoxes.map((formBox, index) => (
          <div key={index} className="w-full px-10 py-3 mb-2 border-2 border-accent1 rounded-lg">
            {index !== 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => removeFormBox(index)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
                >
                  X
                </button>
              </div>
            )}
            {/* Certificate Type */}
            <div className="flex flex-col w-full mb-1">
              <label htmlFor={`certificateType-${index}`} className="text-md font-medium mb-2 text-left">Certificate Type</label>
              <input
                id={`certificateType-${index}`}
                type="text"
                value={formBox.certificateType}
                onChange={(e) => handleInputChange(index, 'certificateType', e.target.value)}
                placeholder="-- Select Certificate Type --"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
              />
            </div>

            {/* First Name */}
            <div className="flex flex-col w-full mb-1">
              <label htmlFor={`firstName-${index}`} className="text-md font-medium mb-2 text-left">First Name</label>
              <input
                id={`firstName-${index}`}
                type="text"
                value={formBox.firstName}
                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                placeholder="Juan"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
              />
            </div>

             {/* Middle Name */}
             <div className="flex flex-col w-full mb-1">
              <label htmlFor={`middleName-${index}`} className="text-md font-medium mb-2 text-left">Middle Name</label>
              <input
                id={`middleName-${index}`}
                type="text"
                value={formBox.middleName}
                onChange={(e) => handleInputChange(index, 'middleName', e.target.value)}
                placeholder="Garcia"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col w-full mb-1">
              <label htmlFor={`lastName-${index}`} className="text-md font-medium mb-2 text-left">Last Name</label>
              <input
                id={`lastName-${index}`}
                type="text"
                value={formBox.lastName}
                onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                placeholder="dela Cruz"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
              />
            </div>

          </div>
        ))}
      </div>

      <div className="w-full flex justify-end">
        <button 
          onClick={addFormBox} 
          className={`bg-accent2 hover:bg-accent2 text-white font-semibold py-2 px-4 rounded-full w-32 ${
            !isValid ? 'opacity-50' : 'hover:bg-opacity-50'
          }`}
          disabled={!isValid}>
          Add Another Document
        </button>
      </div>
    </div>
  );
};

export default DocumentType;
