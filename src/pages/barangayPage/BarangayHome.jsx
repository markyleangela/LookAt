import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { BarangayContext } from '../../contexts/BarangayContext';
import AdminNavbar from '../../components/AdminNavbar';

const BarangayHome = () => {
  const { id } = useParams();
  const { barangayData, fetchBarangay, error} = useContext(BarangayContext);

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
      <AdminNavbar barangayData={barangayData} />
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="text-2xl font-semibold text-gray-700">
          <h2>{barangayData.barangayName}</h2>
          <p>{barangayData.purok}</p>
          <p>{barangayData.barangayLoc}</p>
          <p>{barangayData.cityMunicipality}</p>
          <p>{barangayData.province}</p>
        </div>
      </div>
    </div>
  );
};

export default BarangayHome;
