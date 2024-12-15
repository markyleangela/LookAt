import React, { useContext } from 'react';
import { RequestContext } from './RequestContext';

const SummarySection = ({ address, receiver }) => {
  const { formBoxes } = useContext(RequestContext);

  return (
    <div className="flex flex-col items-center justify-start max-w-[1000px] w-full px-4 mx-auto">
      <h2 className="text-3xl font-bold">Request Summary</h2>

      {/* Request Details */}
      <div className="w-full mb-6">
        <h2 className="text-lg font-bold">Request Details</h2>
        <div className="border border-accent1 rounded-lg overflow-hidden">
          <div className="flex flex-col">

            {/* First Name */}
            <div className="flex flex-row">
              <div className="flex-[0.25] bg-accent1 text-white text-center p-4 font-bold border-b-2 border-white">First Name</div>
              <div className="flex-1 p-4 border-b-2 border-accent1">{receiver.firstName}</div>
            </div>

            {/* Middle Name */}
            <div className="flex flex-row">
              <div className="flex-[0.25] bg-accent1 text-white p-4 text-center font-bold border-b-2 border-white">Middle Name</div>
              <div className="flex-1 p-4 border-b-2 border-accent1">{receiver.middleName}</div>
            </div>

            {/* Last Name */}
            <div className="flex flex-row">
              <div className="flex-[0.25] bg-accent1 text-white text-center p-4 font-bold border-b-2 border-white">Last Name</div>
              <div className="flex-1 p-4 border-b-2 border-accent1">{receiver.lastName}</div>
            </div>

            {/* Outlet Address */}
            <div className="flex flex-row">
              <div className="flex-[0.25] bg-accent1 text-white text-center p-4 font-bold">Outlet Address</div>
              <div className="flex-1 p-4">{address.barangay}, {address.city}, {address.province}, {address.region}</div>
            </div>

          </div>
        </div>
      </div>


      {/* Contact Information */}
      <div className="w-full mb-6">
        <h2 className="text-lg font-bold">Contact Information</h2>
        <div className="border border-accent1 rounded-lg overflow-hidden">
          <div className="flex flex-col">

            {/* Email */}
            <div className="flex flex-row">
              <div className="flex-[0.25] bg-accent1 text-white text-center p-4 font-bold border-b-2 border-white">Email</div>
              <div className="flex-1 p-4 border-b-2 border-accent1">
                {receiver.email ? receiver.email : "N/A"}
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex flex-row">
              <div className="flex-[0.25] bg-accent1 text-white text-center p-4 font-bold">Mobile Number</div>
              <div className="flex-1 p-4">{receiver.mobileNumber}</div>
            </div>

          </div>
        </div>
      </div>


      {/* Certificates/Documents Requested */}
      <div className="w-full mb-6">
        <h2 className="text-xl font-bold mb-4">Certificates/Documents Requested</h2>
        <div className="border border-accent1 rounded-lg overflow-hidden">
          {formBoxes.map((formBox, index) => (
            <div key={index} className="flex flex-row">
              
              {/* Request # */}
              <div
                className={`flex-[0.25] bg-accent1 text-white p-4 font-bold text-center ${index !== formBoxes.length - 1 && 'border-b-2 border-white'}`}
              >
                Request #{index + 1}
              </div>
              
              {/* Certificate Info */}
              <div
                className={`flex-1 p-4 ${index !== formBoxes.length - 1 && 'border-b-2 border-accent1'}`}
              >
                <span className='italic font-bold'>{formBox.certificateType}</span>: {formBox.firstName} {formBox.middleName} {formBox.lastName}
              </div>

            </div>
          ))}
        </div>
      </div>



    </div>
  );
};

export default SummarySection;
