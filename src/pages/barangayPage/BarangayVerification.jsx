import React from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { BarangayContext } from '../../context/BarangayContext';

const BarangayVerification = () => {

  const { id } = useParams();
  const { barangayData, fetchBarangay, error } = useContext(BarangayContext);

  useEffect(() => {
    if (id && !barangayData) {
      fetchBarangay(id);
    }
  }, [id, barangayData, fetchBarangay]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!barangayData) {
    return <div>Loading...</div>;
  }

    return (
        <div className="flex h-screen">
          <AdminNavbar barangayData={barangayData}/>
    
          <div className="flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-2xl font-semibold text-gray-700">
              Verification
            </div>
          </div>
        </div>
      );
}

export default BarangayVerification