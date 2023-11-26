import axios from 'axios';

const addLike = async (userId: any, postId: any) => {
  try {
    const likeData = { userId, postId };
    const response = await axios.post('http://localhost:8080/api/likes', likeData);
    console.log('Like adicionado com sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar o like:', error);
    throw error;
  }
};

export default addLike;