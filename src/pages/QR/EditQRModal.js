import React, { useState, useEffect } from 'react';

const EditQRModal = ({ isOpen, onClose, onUpdate, qrToEdit }) => {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(128);

  useEffect(() => {
    if (qrToEdit) {
      setAlias(qrToEdit.alias);
      setUrl(qrToEdit.url);
      setBgColor(qrToEdit.bgColor);
      setFgColor(qrToEdit.fgColor);
      setSize(qrToEdit.size);
    }
  }, [qrToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (alias && url) {
      onUpdate({ ...qrToEdit, alias, url, fgColor, bgColor, size });
      // Resetear campos
      setAlias('');
      setUrl('');
      setFgColor('#000000');
      setBgColor('#ffffff');
      setSize(128);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Editar QR</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block mb-1 font-medium">Nombre</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block mb-1 font-medium">URL</label>
            <input
              type="url"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          {/* Color del código (primer plano) */}
          <div>
            <label className="block mb-1 font-medium">Color del código (primer plano)</label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-12 h-8 p-0 border-0"
            />
          </div>

          {/* Color de fondo */}
          <div>
            <label className="block mb-1 font-medium">Color de fondo</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-12 h-8 p-0 border-0"
            />
          </div>

          {/* Tamaño */}
          <div>
            <label className="block mb-1 font-medium">Tamaño (px)</label>
            <input
              type="number"
              min="64"
              max="512"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Botones */}
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

export default EditQRModal;
