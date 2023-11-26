import axios from 'axios';

const uploadAvatar = async (userId: number, avatar: File): Promise<void> => {
  const formData = new FormData();
  formData.append('file', avatar);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    await axios.post(`http://localhost:8080/api/usuarios/${userId}/avatar`, formData, config);
    console.log('Avatar atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar o avatar:', error);
    throw new Error('Erro ao atualizar o avatar');
  }
};

export default uploadAvatar;
