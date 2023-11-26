import axios from 'axios';

const checkIfUserAlreadyLiked = async (userId: any, postId: any) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/likes/checkIfUserAlreadyLiked/${postId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar se o usuário já curtiu o post:', error);
    throw error;
  }
};

const addLike = async (userId: any, postId: any) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/likes/addLike/${postId}/${userId}`);
    console.log('Like adicionado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar o like:', error);
    throw error;
  }
};

const removeLike = async (userId: any, postId: any) => {
  try {
    const response = await axios.post(`http://localhost:8080/api/likes/removeLike/${postId}/${userId}`);
    console.log('Like removido com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao remover o like:', error);
    throw error;
  }
};

export { addLike, removeLike, checkIfUserAlreadyLiked };
