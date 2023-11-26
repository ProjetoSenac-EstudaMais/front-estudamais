import axios from 'axios';

interface Follower {
    id: number;
    nome: string;
    sobrenome: string;
    username: string;
    email: string;
}

const getFollowersCount = async (userId: number): Promise<number> => {
    try {
        const response = await axios.get<Follower[]>(`http://localhost:8080/api/usuarios/${userId}/seguidos`);
        const followers: Follower[] = response.data;
        return followers.length;
    } catch (error) {
        console.error('Erro ao buscar informações dos seguidores:', error);
        return 0; // Ou outro valor padrão, caso haja erro na requisição
    }
};

const getFollowingCount = async (userId: number): Promise<number> => {
    try {
        const response = await axios.get<Follower[]>(`http://localhost:8080/api/usuarios/${userId}/seguindo`);
        const following: Follower[] = response.data;
        return following.length;
    } catch (error) {
        console.error('Erro ao buscar informações dos usuários seguidos:', error);
        return 0; // Ou outro valor padrão, caso haja erro na requisição
    }
};

const getPostsCount = async (userId: number): Promise<number> => {
    try {
        const response = await axios.get<any[]>(`http://localhost:8080/api/posts/usuario/${userId}`);
        const posts: any[] = response.data; // Substitua 'any' pelo tipo de dado dos posts se estiver definido
        return posts.length;
    } catch (error) {
        console.error('Erro ao buscar informações dos posts do usuário:', error);
        return 0; // Ou outro valor padrão, caso haja erro na requisição
    }
};

export { getFollowersCount, getFollowingCount,getPostsCount };