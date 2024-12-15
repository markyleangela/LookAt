import React, { useState, useEffect, useContext } from 'react';
import { BarangayContext } from '../../context/BarangayContext.js';
import requestService from '../../api/RequestService.js';

const AcceptedRequestsHistory = () => {
  const { barangayData } = useContext(BarangayContext);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        if (barangayData?.barangayId) {
          const fetchedRequests = await requestService.getRequestsByBarangayId(barangayData.barangayId);
          // Filter accepted requests
          const accepted = fetchedRequests.filter(request => request.isPending === true);
          setAcceptedRequests(accepted);
        }
      } catch (error) {
        console.error('Error fetching accepted requests:', error);
      }
    };

    fetchAcceptedRequests();
  }, [barangayData]);

  return (
    <div className="flex flex-col p-8">
      <h2 className="text-2xl font-semibold mb-4">Accepted Requests History</h2>
      {acceptedRequests.length > 0 ? (
        <div className="space-y-4">
          {acceptedRequests.map((request) => (
            <div
              key={request.requestId}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-300"
            >
              <p>Request ID: {request.requestId}</p>
              <p>Document ID: {request.documentId}</p>
              <p>Quantity: {request.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No accepted requests found for this Barangay.</p>
      )}
    </div>
  );
};

export default AcceptedRequestsHistory;
