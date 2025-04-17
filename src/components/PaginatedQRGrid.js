import React, { useEffect, useState } from 'react';
import QRCodeCard from './QRCodeCard';
import Spinner from './utils/Spinner';
import httpService from '../services/httpService';


const PaginatedQRGrid = ({ onEdit, onDelete, shouldReload, onReloaded }) => {
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const obtenerQRCodes = async () => {
    try {
      setLoading(true);
      const response = await httpService.get(`/qrlink/paged?page=${page}&pageSize=${limit}`);
      setQrCodes(response.data.data); 
      setTotalPages(response.data.totalPages);
    } catch (error) {
      const mensajeError = error?.response?.data;

      if (
        mensajeError === 'Page number exceeds total pages.' &&
        page > 1
      ) {
        //Intentó ir a una página inválida, retroceder
        setPage((prev) => prev - 1);
        return;
      }
      console.error('Error al obtener los códigos QR:', error.message);
    } finally {
      setLoading(false);
      if (shouldReload && onReloaded) {
        onReloaded(); // <-- Limpiar bandera en el padre
      }
    }
  };

  useEffect(() => {
    obtenerQRCodes();
  }, [page, shouldReload]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : qrCodes.length > 0 ? (
        <>
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
                onEdit={() => onEdit(qr)}
                onDelete={() => onDelete(qr)}
              />
            ))}
          </div>

          {/* Paginación */}
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
        <p>No hay códigos QR aún.</p>
      )}
    </div>
  );
};

export default PaginatedQRGrid;
