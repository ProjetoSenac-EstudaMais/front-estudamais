import axios from 'axios';

interface Community {
  id: number;
  nome: string;
  descricao: string;
  quizes: any[]; // Defina o tipo correto para quizes, membros, administradores, etc.
  membros: any[];
  administradores: any[];
  approvedPosts: any[];
}

const getCommunities = async (): Promise<Community[]> => {
  try {
    const response = await axios.get<Community[]>('http://localhost:8080/api/communities');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar as comunidades:', error);
    return [];
  }
};

export default getCommunities;
