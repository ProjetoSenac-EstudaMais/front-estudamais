import axios from 'axios';

export const newPost = async (conteudo: string, userId: number) => {
    try {
        const response = await axios.post('http://localhost:8080/api/posts', {
            conteudo,
            autor: {
                id: userId
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao criar a postagem: ' + error);
    }
};