import axios from 'axios';

const registerUser = async (userData: any) => {
  try {
    const response = await axios.post("http://localhost:8080/api/usuarios", userData);
    console.log('Usuário registrado:', response.data);
    return response.data; // Retorna os dados do usuário registrado (opcional)
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error; // Você pode tratar o erro aqui ou relançá-lo para o componente que chama essa função
  }
};

const registerAuth = async (authData: any) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/register", authData);
    console.log('Autenticação registrada:', response.data);
    return response.data; // Retorna os dados de autenticação registrados (opcional)
  } catch (error) {
    console.error('Erro ao registrar autenticação:', error);
    throw error; // Você pode tratar o erro aqui ou relançá-lo para o componente que chama essa função
  }
};

export { registerUser, registerAuth };
