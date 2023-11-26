import axios from 'axios';

const checkIfUserIsFollowing = async (userId: number, loggedUserId: number): Promise<boolean> => {
    try {
        const response = await axios.get<boolean>(`http://localhost:8080/api/usuarios/checkIfUserIsFollowing/${loggedUserId}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao verificar se o usuário está sendo seguido:', error);
        return false;
    }
};

const deixarDeSeguirUsuario = async (userId: number, loggedUserId: number): Promise<void> => {
    try {
        await axios.post(`http://localhost:8080/api/usuarios/unfollow/${loggedUserId}/${userId}`);
        console.log('Deixou de seguir o usuário com sucesso!');
    } catch (error) {
        console.error('Erro ao deixar de seguir o usuário:', error);
    }
};

const seguirUsuario = async (userId: number, loggedUserId: number): Promise<void> => {
    try {
        await axios.post(`http://localhost:8080/api/usuarios/follow/${loggedUserId}/${userId}`);
        console.log('Seguiu o usuário com sucesso!');
    } catch (error) {
        console.error('Erro ao seguir o usuário:', error);
    }
};

export { checkIfUserIsFollowing, deixarDeSeguirUsuario, seguirUsuario };