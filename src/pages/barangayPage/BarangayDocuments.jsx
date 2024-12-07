import React from 'react';
import AdminNavbar from '../../components/AdminNavbar';

const BarangayDocuments = () => {
  return (
    <div className="flex h-screen">
      <AdminNavbar />

      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="text-2xl font-semibold text-gray-700">
          Documents
        </div>
      </div>
    </div>
  );
};

export default BarangayDocuments;
