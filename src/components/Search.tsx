import { useState, useEffect } from 'react';
import axios from 'axios';
import AvatarUsuario from './Avatar';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
    id: number;
    nome: string;
    avatar: string;
    sobrenome: string;
    username: string;
    descricao: string;
}

interface SearchDropdownProps {
    isOpen: boolean;
    conteudo: string;
}

const Search: React.FC<SearchDropdownProps> = ({ isOpen, conteudo }) => {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const navigate = useNavigate();


    const redirectToCommunity = (id: string | number) => {
        const communityId = typeof id === 'string' ? parseInt(id, 10) : id;
        navigate(`/communities/${communityId}`);
    };

    const redirectToUser = (username: string) => {
        navigate(`/profile/${username}`);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/search/${conteudo}`);
            const searchData = response.data;

            // Verifica se a resposta é um array
            if (Array.isArray(searchData)) {
                setSearchResults(searchData);
            } else {
                console.error('Resposta da pesquisa não é um array:', searchData);
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Erro ao buscar os resultados da pesquisa:', error);
            setSearchResults([]);
        }
    };

    useEffect(() => {
        // Realiza a busca somente se o conteúdo da pesquisa não estiver vazio
        if (conteudo.trim() !== '') {
            handleSearch();
        } else {
            setSearchResults([]); // Limpa os resultados se o conteúdo da pesquisa estiver vazio
        }
    }, [conteudo]);

    return (
        <>
            {isOpen && (
                <div className='absolute top-28 left-[36.1rem] w-[430px] min-h-[100px] rounded-md bg-white shadow-md '>
                    {/* Renderiza os resultados da pesquisa */}
                    {searchResults.map((result, index) => (
                        <>
                            <div key={index} className='flex justify-between pb-4 p-4'>
                                <div className='flex items-center gap-2'>
                                    <AvatarUsuario avatar={result.avatar} size="45px" />
                                    <div className='flex gap-1 text-xl'>
                                        <h1>{result.nome}</h1>
                                        <h1>{result.sobrenome}</h1>
                                    </div>
                                </div>
                                <div className='w-[120px]'>
                                    {result.descricao ? (
                                        <Button outline label='Ver mais' onClick={() => redirectToCommunity(result.id)} />
                                    ) : (
                                        <Button outline label='Ver Perfil' onClick={() => redirectToUser(result.username)} />
                                    )}
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-gray-300 border-opacity-50" />
                        </>
                    ))}
                    {/* Mensagem se não houver resultados */}
                    {searchResults.length === 0 && (
                        <div className='flex justify-center pt-4'>
                            <p>Pesquise por usuarios, comunidades..</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Search;
