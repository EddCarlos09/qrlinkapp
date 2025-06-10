import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onCancel, onConfirm, elementName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">¿Eliminar QR?</h2>
        <p className="text-gray-600 mb-6">
          ¿Estás seguro que deseas eliminar <strong>{elementName}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
