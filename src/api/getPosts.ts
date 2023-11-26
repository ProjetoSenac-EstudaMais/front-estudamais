import axios from 'axios';

export interface PostData {
    id: number;
    conteudo: string;
    autor: any; // Substitua 'any' pelo tipo apropriado para o autor
    comentarios: any[]; // Substitua 'any[]' pelo tipo apropriado para os comentários
    likes: any[]; // Substitua 'any[]' pelo tipo apropriado para os likes
    numeroReposts: number;
    onPostClick: () => void;
}

const getAllPosts = async (): Promise<PostData[]> => {
    try {
        const response = await axios.get<PostData[]>('http://localhost:8080/api/posts');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return [];
    }
};

const getUserPosts = async (userId: number): Promise<PostData[]> => {
    try {
        const response = await axios.get<PostData[]>(`http://localhost:8080/api/posts/usuario/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return [];
    }
};

export { getAllPosts, getUserPosts };
