import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const RequestContext = createContext();

// Create the provider component
export const RequestProvider = ({ children }) => {
  const storedFormBoxes = JSON.parse(localStorage.getItem('formBoxes')) || [
    { certificateType: '', firstName: '', middleName: '', lastName: '' },
  ];

  const [formBoxes, setFormBoxes] = useState(storedFormBoxes);

  // Update localStorage whenever formBoxes changes
  useEffect(() => {
    localStorage.setItem('formBoxes', JSON.stringify(formBoxes));
  }, [formBoxes]);

  // Function to add a new form box
  const addFormBox = () => {
    const newFormBoxes = [
      ...formBoxes,
      { certificateType: '', firstName: '', middleName: '', lastName: '' },
    ];
    setFormBoxes(newFormBoxes);
  };

  // Function to remove a form box
  const removeFormBox = (index) => {
    const updatedFormBoxes = formBoxes.filter((_, i) => i !== index);
    setFormBoxes(updatedFormBoxes);
  };

  // Function to handle input change
  const handleInputChange = (index, field, value) => {
    const updatedFormBoxes = [...formBoxes];
    updatedFormBoxes[index] = { ...updatedFormBoxes[index], [field]: value };
    setFormBoxes(updatedFormBoxes);
  };

  return (
    <RequestContext.Provider
      value={{
        formBoxes,
        addFormBox,
        removeFormBox,
        handleInputChange,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};
