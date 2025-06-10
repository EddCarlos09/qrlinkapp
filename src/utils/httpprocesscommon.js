const BASE_URL = 'https://localhost:7149/api'; // ← cambia esta URL a la de tu backend

export const httpPost = async (endpoint, body) => {
  try {

    console.log(`${BASE_URL}/${endpoint}`);

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      if(response.status === 401)
        throw new Error('Credenciales incorrectas');  
      else
        throw new Error( data.message || 'Ocurrió un error en la petición');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
