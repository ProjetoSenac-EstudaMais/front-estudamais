import axios from 'axios';

export const sendComment = async (postId: number, userId: number, commentContent: string | undefined) => {
    try {
        if (postId && userId && commentContent) {
            const response = await axios.post(`http://localhost:8080/api/posts/${postId}/comentarios?userId=${userId}`, {
                conteudo: commentContent
            });
            if (response.status === 201) {
                // Lógica para lidar com o sucesso ao enviar o comentário
                console.log('Comentário enviado com sucesso:', response.data);
                setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                return response.data; // ou algum indicativo de sucesso
                
            } else {
                throw new Error('Erro ao enviar o comentário');
            }
        }
    } catch (error) {
        console.error('Erro ao enviar o comentário:', error);
        throw error; // Se quiser lidar com o erro fora desta função
    }
};
