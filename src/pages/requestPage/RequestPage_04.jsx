import React, { useContext, useEffect, useState } from 'react';
import { RequestContext } from './RequestContext';
import documentService from '../../api/DocumentService';
import { useUser } from '../../context/UserContext';

const DocumentType = ({ setIsDocumentValid }) => {
  const { formBoxes, addFormBox, removeFormBox, handleInputChange } = useContext(RequestContext);
  const [documents, setDocuments] = useState([]);
  const { user } = useUser();

  // Effect to fetch documents based on barangayId
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await documentService.getDocumentsByBarangay(user.barangayId);
        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    if (user.barangayId) {
      fetchDocuments();
    }
  }, [user.barangayId]);

  // Validate the form boxes
  useEffect(() => {
    const isValid = formBoxes.every(
      (formBox) =>
        formBox.documentId && formBox.firstName && formBox.middleName && formBox.lastName // Ensure documentId is selected
    );
    setIsDocumentValid(isValid); // Propagate validity to parent component
  }, [formBoxes, setIsDocumentValid]);

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
            <div className="flex flex-col w-full mb-4 max-w-md">
              <label htmlFor={`document-${index}`} className="text-md font-medium mb-2 text-left">
                Select Document
              </label>
              <select
                id={`document-${index}`}
                value={formBox.documentId || ''} // Ensure value is from `documentId`
                onChange={(e) => handleInputChange(index, 'documentId', e.target.value)} // Update documentId, not an array
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
              >
                <option value="">Select a document</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.documentId}>
                    {doc.documentName}
                  </option>
                ))}
              </select>
            </div>

            {/* First Name */}
            <div className="flex flex-col w-full mb-1">
              <label htmlFor={`firstName-${index}`} className="text-md font-medium mb-2 text-left">
                First Name
              </label>
              <input
                id={`firstName-${index}`}
                type="text"
                value={formBox.firstName || ''}
                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                placeholder="Juan"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
              />
            </div>

            {/* Middle Name */}
            <div className="flex flex-col w-full mb-1">
              <label htmlFor={`middleName-${index}`} className="text-md font-medium mb-2 text-left">
                Middle Name
              </label>
              <input
                id={`middleName-${index}`}
                type="text"
                value={formBox.middleName || ''}
                onChange={(e) => handleInputChange(index, 'middleName', e.target.value)}
                placeholder="Garcia"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col w-full mb-1">
              <label htmlFor={`lastName-${index}`} className="text-md font-medium mb-2 text-left">
                Last Name
              </label>
              <input
                id={`lastName-${index}`}
                type="text"
                value={formBox.lastName || ''}
                onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                placeholder="Dela Cruz"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent1"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end">
        <button
          onClick={addFormBox}
          className={`bg-accent2 text-white font-semibold py-2 px-4 rounded-full w-32 ${
            !formBoxes.every(
              (formBox) =>
                formBox.documentId &&
                formBox.firstName &&
                formBox.middleName &&
                formBox.lastName
            )
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-opacity-90'
          }`}
          disabled={!formBoxes.every(
            (formBox) =>
              formBox.documentId &&
              formBox.firstName &&
              formBox.middleName &&
              formBox.lastName
          )}
        >
          Add Another Document
        </button>
      </div>
    </div>
  );
};

export default DocumentType;
