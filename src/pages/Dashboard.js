// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CreateQRModal from './QR/CreateQRModal';
import EditQRModal from './QR/EditQRModal';
import ConfirmDeleteModal from '../components/utils/ConfirmDeleteModal';
import PaginatedQRGrid from '../components/PaginatedQRGrid';
import httpService from '../services/httpService';
import Toast from '../components/utils/Toast';
import Spinner from '../components/utils/Spinner';

const Dashboard = () => {


  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [qrToEdit, setQrToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [qrToDelete, setQrToDelete] = useState(null);

  const [shouldReload, setShouldReload] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  // Crear nuevo QR
  const handleCreate = async (newQR) => {
    try {
      setLoading(true);
  
      const response = await httpService.post('/qrlink', {
        url: newQR.url,
        alias: newQR.alias,
        fgColor: newQR.fgColor,
        bgColor: newQR.bgColor,
        size: newQR.size,
      });
      if (response.status === 201) {
        setToastMsg('¡Registro capturado!'); // <-- Mostrar el toast
        setShouldReload(true); // <-- Activar recarga
        setIsCreateModalOpen(false); // <-- Cerrar el modal de crear
      }
    } catch (error) {
      console.error('Error al crear QR:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (qr) => {
    setQrToEdit(qr);
    setIsEditModalOpen(true);
  };
  
  const handleUpdate = async (updatedQR) => {
    try {
      setLoading(true);
      const response = await httpService.put(`/qrlink/${updatedQR.id}`, updatedQR);
      if (response.status === 204) {
        setToastMsg('¡QR actualizado!');
        setIsEditModalOpen(false);
        setShouldReload(true); // <-- Refrescar la grilla
      }
    } catch (error) {
      console.error('Error al actualizar QR:', error);
    } finally {
      setLoading(false);
    }
  };


  // Eliminar QR
  const confirmDelete = (deletedQR) => {
    setQrToDelete(deletedQR);
    setIsDeleteModalOpen(true);
  };

 
  const handleDeleteConfirmed = async () => {
    if (!qrToDelete) return;
  
    try {
      setLoading(true);
  
      // Llamada DELETE al endpoint
      const response = await httpService.delete(`/qrlink/${qrToDelete.id}`);
  
      if (response.status === 200 || response.status === 204) {
        setToastMsg('QR eliminado exitosamente');
        setShouldReload(true); // Forzar recarga en PaginatedQRGrid
      } else {
        console.error('Fallo al eliminar QR. Código:', response.status);
      }
    } catch (error) {
      console.error('Error al eliminar QR:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setQrToDelete(null);
      setLoading(false);
    }
  };
  
  
  return (
    <Layout>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
      {loading ? ( <Spinner />) : (<div></div>)}
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
        qrName={qrToDelete?.alias}
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

        <PaginatedQRGrid
          onEdit={handleEdit}
          onDelete={confirmDelete}
          shouldReload={shouldReload}
          onReloaded={() => setShouldReload(false)}
        />
        
    </Layout>
  );
};

export default Dashboard;
