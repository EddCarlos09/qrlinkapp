import React, { useState } from 'react';
import Layout from '../components/Nav/Layout';
import CreateFolderModal from './Folder/CreateFolderModal';
import PaginatedFolderGrid from '../components/Folder/PaginatedFolderGrid';
import ConfirmDeleteModal from '../components/utils/ConfirmDeleteModal';
import Toast from '../components/utils/Toast';
import Spinner from '../components/utils/Spinner';
import httpService from '../services/httpService';

const Folders = () => {
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);

  const [shouldReload, setShouldReload] = useState(false);

  // Crear carpeta
  const handleCreate = async (newFolder) => {
    try {
      setLoading(true);
      const response = await httpService.post('/folder', {
        folderName: newFolder.folderName
      });

      if (response.status === 201) {
        setToastMsg('¡Carpeta creada exitosamente!');
        setShouldReload(true);
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      console.error('Error al crear carpeta:', error);
      setToastMsg('¡Error al crear la carpeta!');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar carpeta
  const confirmDelete = (folder) => {
    setFolderToDelete(folder);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!folderToDelete) return;

    try {
      setLoading(true);
      const response = await httpService.delete(`/folder/${folderToDelete.id}`);

      if (response.status === 200 || response.status === 204) {
        setToastMsg('Carpeta eliminada');
        setShouldReload(true);
      }
    } catch (error) {
      console.error('Error al eliminar carpeta:', error);
      setToastMsg('¡Error al eliminar la carpeta!');
    } finally {
      setIsDeleteModalOpen(false);
      setFolderToDelete(null);
      setLoading(false);
    }
  };

  return (
    <Layout>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
      {loading && <Spinner />}

      <CreateFolderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirmed}
        elementName={folderToDelete?.folderName}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Carpetas</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Crear Carpeta
        </button>
      </div>

      <PaginatedFolderGrid
        onDelete={confirmDelete}
        shouldReload={shouldReload}
        onReloaded={() => setShouldReload(false)}
      />
    </Layout>
  );
};

export default Folders;
