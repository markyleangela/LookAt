import React, { useState, useEffect, useContext } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
import { BarangayContext } from '../../contexts/BarangayContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Switch from '@mui/material/Switch';
import requestService from '../../api/RequestService.js';

const BarangayRequests = () => {
  const { id } = useParams();
  const [requests, setRequests] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track which request is being edited
  const { barangayData, fetchBarangay, error } = useContext(BarangayContext);
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation();

  const handleNavigate = () => {
    navigate(`${location.pathname}/all`); // Appends '/all' to the current route
  };

  useEffect(() => {
    if (id && !barangayData) {
      fetchBarangay(id);
    }
  }, [id, barangayData, fetchBarangay]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (barangayData.barangayId) {
          const fetchedRequests = await requestService.getRequestsByBarangayId(barangayData.barangayId);
          setRequests(fetchedRequests);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, [barangayData]);

  const toggleEdit = (requestId) => {
    setIsEditing(isEditing === requestId ? null : requestId); // Toggle edit mode for specific request
  };

  const handleSubmit = async (values, requestId) => {
    try {
      const response = await requestService.updateRequest(requestId, values);
      console.log(response);
      alert('Request updated successfully');
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.requestId === requestId ? { ...request, isPending: values.isPending } : request
        )
      );
    } catch (error) {
      alert('Error updating request');
    }
    setIsEditing(null); // Exit edit mode
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!barangayData) {
    return <div>Loading...</div>;
  }

  // RequestCard component to display individual request details
  const RequestCard = ({ request }) => (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between items-center hover:scale-105 transform transition duration-200 ease-in-out h-62 w-52 mx-5 border border-gray-300">
      {!isEditing || isEditing !== request.requestId ? (
        <>
          {/* Header Section */}
          <div className="bg-accent2 h-8 w-full rounded-t-md flex items-center justify-center">
            <p className="text-white text-md font-semibold">Request ID: {request.requestId}</p>
          </div>
          {/* Content Section */}
          <div className="flex flex-col justify-center items-center flex-1 mt-4">
            <p className="font-semibold text-lg">Document ID: {request.documentId}</p>
            <p className="text-sm mt-2">Request Type: {request.requestType}</p>
            <p className="text-sm mt-2">Quantity: {request.quantity}</p>
            <p className={`text-sm mt-2 ${!request.isPending ? "text-orange-500" : "text-green-600"}`} >
              {!request.isPending ? "Pending" : "Completed"}
            </p>
          </div>
          {/* Edit Button */}
          <button
            className="mt-4 px-4 py-2 bg-accent1 text-white rounded shadow hover:bg-accent1-dark"
            onClick={() => toggleEdit(request.requestId)}
          >
            Edit
          </button>
        </>
      ) : (
        <Formik
          initialValues={{
            isPending: request.isPending,
          }}
          validationSchema={Yup.object({
            isPending: Yup.boolean(),
          })}
          onSubmit={(values) => handleSubmit(values, request.requestId)}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-2 w-full">
              <div className="flex items-center space-x-2">
                <Field name="isPending">
                  {({ field, form }) => (
                    <Switch
                      checked={field.value}
                      onChange={(e) => form.setFieldValue('isPending', e.target.checked)}
                      color="primary"
                    />
                  )}
                </Field>
                <label htmlFor="isPending" className="text-sm">Completed</label>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(null)}
                  className="px-4 py-2 bg-gray-300 rounded shadow hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );

  return (
    <div className="flex h-screen">
      <AdminNavbar barangayData={barangayData} />
      <div className="flex flex-1 flex-col bg-gray-50 p-8">
        <div className="flex justify-between items-center mb-4">
          {/* Button to access accepted requests history */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            onClick={handleNavigate} // Navigate to new page
          >
            View Accepted Requests History
          </button>
        </div>
        <div className="flex flex-wrap">
          {requests.length > 0 ? (
            requests
              .filter((request) => !request.isPending) // Only show pending requests
              .map((request) => (
                <RequestCard key={request.requestId} request={request} />
              ))
          ) : (
            <p className="text-gray-600">No pending requests found for this Barangay.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BarangayRequests;
