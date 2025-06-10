import React, { useState, useEffect } from 'react';
import FolderCard from './FolderCard';
import Spinner from '../utils/Spinner';
import httpService from '../../services/httpService';

const PaginatedFolderGrid = ({ onDelete, shouldReload, onReloaded }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      const response = await httpService.get(`/folder/paged?page=${page}&pageSize=${limit}`);
      setFolders(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      const msg = error?.response?.data;
      if (msg === 'Page number exceeds total pages.' && page > 1) {
        setPage((prev) => prev - 1);
        return;
      }
      console.error('Error al obtener carpetas:', error.message);
    } finally {
      setLoading(false);
      if (shouldReload && onReloaded) {
        onReloaded();
      }
    }
  };

  const handleUpdateFolderName = async (updatedFolder) => {
    try {
      const response = await httpService.put(`/folder/${updatedFolder.id}`, updatedFolder);

      if (response.status === 200 || response.status === 204) {
        setFolders((prevFolders) =>
          prevFolders.map((folder) =>
            folder.id === updatedFolder.id ? { ...folder, folderName: updatedFolder.folderName } : folder
          )
        );
      }
    } catch (error) {
      console.error('Error al actualizar el nombre de la carpeta:', error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [page, shouldReload]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : folders.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                id={folder.id}
                name={folder.folderName}
                onEdit={handleUpdateFolderName}
                onDelete={() => onDelete(folder)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-gray-700">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 mt-6">No hay elementos aún.</p>
      )}
    </div>
  );
};

export default PaginatedFolderGrid;
