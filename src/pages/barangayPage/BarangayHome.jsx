import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar'
import { useParams } from 'react-router-dom';
import barangayService from '../../api/barangayService';

const BarangayHome = () => {

  const { id } = useParams();

  const [barangayData, setBarangayData] = useState(null);

  useEffect(() => {
    const fetchBarangay = async () => {
      try {
        const response = await barangayService.getBarangayById(id);
        setBarangayData(response.data);
      } catch (error) {
        console.error('Error fetching barangay data: ', error);
      }
    };

    if (id) {
      fetchBarangay();
    }
  }, [id]);

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
}

export default BarangayHome;
