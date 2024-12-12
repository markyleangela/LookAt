// src/pages/BarangayDocuments.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { BarangayContext } from '../../contexts/BarangayContext';
import AdminNavbar from '../../components/AdminNavbar';
import { FilePlus } from 'lucide-react';
import Modal from '../../components/AddDocumentModal';  // Import Modal Component
import documentService from '../../api/DocumentService';

const BarangayDocuments = () => {
  const { id } = useParams();
  const { barangayData, fetchBarangay, error } = useContext(BarangayContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);  // State to store documents


  useEffect(() => {
    if (id && !barangayData) {
      fetchBarangay(id);
    }
  }, [id, barangayData, fetchBarangay]);

  useEffect(() => {
      const fetchDocuments = async () => {
        try {
          const fetchedDocuments = await documentService.getDocument(barangayData.barangayId);
          setDocuments(fetchedDocuments);  // Store the documents in state
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      };
      fetchDocuments();
  }, [barangayData]);  // Run when barangayData changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!barangayData) {
    return <div>Loading...</div>;
  }

  const handleAddDocument = async (values) => {
    try {
      const data = {...values, barangayId: barangayData.barangayId };
      await documentService.createDocument(data);
      alert('Good Job');
      setIsModalOpen(false);
    } catch (error) {
      alert('Bad Job');
      console.log('Error: ', error);
    }
  };

  const DocumentCard = ({ document }) => (
    <div className="bg-gray-200 shadow-md rounded-lg p-4 flex justify-between items-center hover:scale-110 active:bg-slate-100 h-28 w-28">
      <p className="text-center">{document.documentName}</p>  {/* Example document rendering */}
    </div>
  );

  const DocumentAddCard = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-200 shadow-md rounded-lg p-4 flex justify-between items-center hover:scale-110 active:bg-slate-100 h-28 w-28">
        <button className="text-accent1 font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>
          <FilePlus className="w-12 h-12" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      <AdminNavbar barangayData={barangayData} />
      <div className="flex flex-1 flex-col items-start justify-start bg-gray-50 p-12">
        {documents.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
        <DocumentAddCard />
        <Modal 
          isOpen={isModalOpen} 
          closeModal={() => setIsModalOpen(false)}
          handleAddDocument={handleAddDocument} 
        />
      </div>
    </div>
  );
};

export default BarangayDocuments;
