// src/components/EditFolderModal.js
import React, { useState, useEffect } from 'react';

const EditFolderModal = ({ isOpen, onClose, onUpdate, folderToEdit }) => {
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    if (folderToEdit) {
      setFolderName(folderToEdit.folderName);
    }
  }, [folderToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim()) {
      onUpdate({ ...folderToEdit, folderName: folderName.trim() });
      setFolderName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Editar carpeta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFolderModal;
