// src/components/Dashboard.js
import React, { useState } from 'react';
import Layout from '../components/Layout';
import CreateQRModal from './QR/CreateQRModal';
import EditQRModal from './QR/EditQRModal';
import ConfirmDeleteModal from '../components/utils/ConfirmDeleteModal';
import QRCodeCard from '../components/QRCodeCard';

const Dashboard = () => {
  const [qrCodes, setQrCodes] = useState([
    {
      id: 1,
      name: 'Morant',
      url: 'https://morant.com.mx',
      codeUrl: 'qr.codes/cKmY7j',
      scans: 3,
      fgColor: '#000000',
      bgColor: '#ffffff',
      size: 128,
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [qrToEdit, setQrToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [qrToDelete, setQrToDelete] = useState(null);

  // Crear nuevo QR
  const handleCreate = (newQR) => {
    const newQrCode = {
      id: qrCodes.length + 1,
      name: newQR.name,
      url: newQR.url,
      codeUrl: `qr.codes/${Math.random().toString(36).substr(2, 6)}`,
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map((qr) => (
          <QRCodeCard
            key={qr.id}
            id={qr.id}
            name={qr.name}
            url={qr.url}
            codeUrl={qr.codeUrl}
            scans={qr.scans}
            fgColor={qr.fgColor}
            bgColor={qr.bgColor}
            size={qr.size}
            onEdit={handleEdit}
            onDelete={confirmDelete}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
