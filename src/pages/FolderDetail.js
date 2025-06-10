import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Nav/Layout';
import PaginatedQRGrid from '../components/QR/PaginatedQRGrid';
import Spinner from '../components/utils/Spinner';
import httpService from '../services/httpService';
import Toast from '../components/utils/Toast';

const FolderDetail = () => {
  const { id } = useParams(); // <-- folderId desde la URL
  const navigate = useNavigate();

  const [folder, setFolder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Datos de QR paginados
  const [qrCodes, setQrCodes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [toastMsg, setToastMsg] = useState('');

  // Cargar datos de la carpeta
  const fetchFolder = async () => {
    try {
      const response = await httpService.get(`/folder/${id}`);
      setFolder(response.data);
    } catch (error) {
      console.error('Error al obtener carpeta:', error);
      setToastMsg('Error al obtener la carpeta');
    }
  };

  // Cargar QR codes de la carpeta
  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const response = await httpService.get(`/qrlink/byfolder/${id}?page=${page}&pageSize=6`);
      setQrCodes(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error al obtener QR codes:', error);
      setToastMsg('Error al cargar códigos QR');
    } finally {
      setLoading(false);
    }
  };

  // Editar QR
  const handleEdit = (qr) => {
    console.log('Editar:', qr);
    // Aquí podrías abrir un modal de edición si lo necesitas
  };

  const handleDelete = async (qr) => {
    try {
      await httpService.delete(`/qrlink/${qr.id}`);
      setToastMsg('QR eliminado');
      fetchQRCodes();
    } catch (error) {
      console.error('Error al eliminar QR:', error);
      setToastMsg('Error al eliminar QR');
    }
  };

  useEffect(() => {
    fetchFolder();
  }, [id]);

  useEffect(() => {
    fetchQRCodes();
  }, [page, id]);

  return (
    <Layout>
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
      {/* {loading && <Spinner />} */}

      {/* ✅ Botón Regresar */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-600 hover:text-green-800 font-medium flex items-center"
      >
        ← Regresar
      </button>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          {folder ? folder.folderName : 'Cargando carpeta...'}
        </h1>
        <p className="text-gray-600">Listado de códigos QR en esta carpeta</p>
      </div>

      <PaginatedQRGrid
        data={qrCodes}
        loading={loading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Layout>
  );
};

export default FolderDetail;
