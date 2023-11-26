import axios from 'axios';

const loginUser = async (userData: any) => {
  try {
    const response = await axios.post("http://localhost:8080/auth/login", userData);
    const { token, nomeUsuario } = response.data;

    // Salvar token e nome do usuário no local storage
    localStorage.setItem('token', token);
    localStorage.setItem('nomeUsuario', nomeUsuario);
    
    // Aguardar 1 segundo antes de recarregar a página
    setTimeout(() => {
      window.location.reload();
    }, 1000);

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login do usuário:', error);
    throw error;
  }
};

const logoutUser = () => {
  // Limpar token e nome do usuário do local storage ou cookies
  localStorage.removeItem('token');
  localStorage.removeItem('nomeUsuario');
  window.location.reload();
};

export { loginUser, logoutUser };
