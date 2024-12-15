// src/pages/BarangayDocuments.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { BarangayContext } from '../../context/BarangayContext';
import AdminNavbar from '../../components/AdminNavbar';
import { FilePlus } from 'lucide-react';
import Modal from '../../components/documents/AddDocumentModal';  // Import Modal Component
import documentService from '../../api/DocumentService';
import DocumentCard from '../../components/documents/DocumentCard';

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
        console.log(barangayData.barangayId)
        try {
          const fetchedDocuments = await documentService.getDocumentsByBarangay(barangayData.barangayId);
          setDocuments(fetchedDocuments);  // Store the documents in state
          console.log(fetchedDocuments)
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

  const DocumentAddCard = () => (
      <div className="bg-gray-200 shadow-md rounded-lg p-4 flex justify-between items-center hover:scale-110 ml-3 active:bg-slate-100 h-56 w-48">
        <button className="text-accent1 font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>
          <FilePlus className="w-32 h-24" />
        </button>
      </div>
  );


  return (
    <div className="flex h-screen">
      <AdminNavbar barangayData={barangayData} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-20 px-5 mx-auto">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
          />
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
