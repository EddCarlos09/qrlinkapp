import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import Spinner from './utils/Spinner';

const KeyRedirect = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const hasRun = useRef(false); //  esta bandera evita ejecuciones dobles

  useEffect(() => {
    if (hasRun.current) return; // ya se ejecutó
    hasRun.current = true;

    const resolveAndRedirect = async () => {
      try {
        const response = await httpService.get(`/QRUtils/resolvekey?key=${key}`);
        const redirectUrl = response.data?.url || response.data?.Url;

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          setError('No se encontró la URL de redirección.');
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setError('El enlace no existe o ha expirado.');
        } else {
          setError('Ocurrió un error al procesar la redirección.');
        }
      }
    };

    resolveAndRedirect();
  }, [key]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-red-600">¡Error!</h1>
        <p className="mt-4 text-gray-700">{error}</p>
        <button
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );
};

export default KeyRedirect;
