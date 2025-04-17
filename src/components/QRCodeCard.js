// src/components/QRCodeCard.js
import React, { useRef, useState } from 'react';
import QRCodeImage from './QRCodeImage';
import Toast from './utils/Toast';
import { X } from 'lucide-react';

const QRCodeCard = ({ 
  id,
  alias, 
  url, 
  short_url, 
  scans, 
  fgColor, 
  bgColor, 
  size, 
  onEdit, 
  onDelete 
}) => {
  const qrRef = useRef();
  const [toastMsg, setToastMsg] = useState('');

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${alias || 'qr-code'}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setToastMsg('¡Descarga completa!');
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md p-5 flex flex-col items-center">
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}

      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
        onClick={() => onDelete(id)}
        title="Eliminar"
      >
        ×
      </button>

      <div 
        ref={qrRef} 
        className="w-32 h-32 mb-4 bg-white flex items-center justify-center overflow-hidden rounded"
        style={{ flexShrink: 0 }}
      >
        <QRCodeImage 
          value={url} 
          size={size}        // tamaño de generación (calidad)
          fgColor={fgColor} 
          bgColor={bgColor} 
          // omitimos size de estilo, usaremos CSS
        />
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-1 text-gray-800 w-full text-center truncate">{alias}</h2>
      <p className="text-sm text-gray-600 w-full text-center break-words overflow-hidden">{short_url}</p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 text-sm underline w-full text-center break-words overflow-hidden"
      >
        {url}
      </a>
      <p className="text-sm text-gray-700 mb-3">Scans: {scans}</p>
      <div className="flex gap-3">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onEdit(id)}
        >
          Editar
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={handleDownload}
        >
          Descargar
        </button>
      </div>
    </div>
  );
};

export default QRCodeCard;
