import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
    id: number;
    avatar: string;
    nome: string;
    sobrenome: string;
    username: string;
}

const useUserInfo = (username: string) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<UserData>(`http://localhost:8080/api/usuarios/profile/${username}`);
                setUserData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [username]);

    return { userData, isLoading };
};

export default useUserInfo;
