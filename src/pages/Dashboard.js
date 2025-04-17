// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CreateQRModal from './QR/CreateQRModal';
import EditQRModal from './QR/EditQRModal';
import ConfirmDeleteModal from '../components/utils/ConfirmDeleteModal';
import QRCodeCard from '../components/QRCodeCard';
import httpService from '../services/httpService';
import Spinner from '../components/utils/Spinner';

const Dashboard = () => {


  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [qrToEdit, setQrToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [qrToDelete, setQrToDelete] = useState(null);

  // Crear nuevo QR
  const handleCreate = (newQR) => {

    const newQrCode = {
      id: 0,
      alias: newQR.alias,
      url: newQR.url,
      //codeUrl: `qr.codes/${Math.random().toString(36).substr(2, 6)}`,
      scans: 0,
      fgColor: newQR.fgColor,
      bgColor: newQR.bgColor,
      size: newQR.size,
    };
    setQrCodes([...qrCodes, newQrCode]);
  };

  // Editar QR
  const handleEdit = (id) => {
    const qr = qrCodes.find((q) => q.id === id);
    setQrToEdit(qr);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (updatedQR) => {
    setQrCodes(qrCodes.map((qr) => (qr.id === updatedQR.id ? updatedQR : qr)));
  };

  // Eliminar QR
  const confirmDelete = (id) => {
    const qr = qrCodes.find((q) => q.id === id);
    setQrToDelete(qr);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    setQrCodes(qrCodes.filter((qr) => qr.id !== qrToDelete.id));
    setIsDeleteModalOpen(false);
    setQrToDelete(null);
  };
  
  const obtenerQRCodes = async () => {
    try {
      const response = await httpService.get('/qrlink');
      await setQrCodes(response.data); 
      console.log(response.data);
      console.log(qrCodes);
    } catch (error) {
      console.error('Error al obtener los códigos QR:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerQRCodes();
  }, []);


  return (
    <Layout>
      {/* Modales */}
      <CreateQRModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />
      <EditQRModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdate}
        qrToEdit={qrToEdit}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirmed}
        qrName={qrToDelete?.name}
      />

      {/* Header interno de dashboard */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Active QR Codes</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Crear QR Code
        </button>
      </div>

      {/* Grid de tarjetas */}

      {
        loading ? ( <Spinner />) 
          : qrCodes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qrCodes.map((qr) => (
          <QRCodeCard
            key={qr.id}
            id={qr.id}
            alias={qr.alias}
            url={qr.url}
            short_url={qr.short_url}
            scans={qr.scans}
            fgColor={qr.fgColor}
            bgColor={qr.bgColor}
            size={qr.size}
            onEdit={handleEdit}
            onDelete={confirmDelete}
          />
        ))}
        </div>
      ) : (
        <p>No hay códigos QR aún.</p>
      )}

        
    </Layout>
  );
};

export default Dashboard;
