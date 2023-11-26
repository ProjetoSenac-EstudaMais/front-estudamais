import Navbar from '../../layout/navbar'
import LoginModal from '../../components/modals/LoginModal'
import RegisterModal from '../../components/modals/RegisterModal'
import AvatarUsuario from '../../components/Avatar'
import imageDefault from '../../assets/default/imageDefault'
import AllPosts from '../../components/posts/AllPosts'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from '../../components/Quiz'

interface CommunityData {
    id: number;
    nome: string;
    descricao: string;
    membros: any[];
    quizes: any[];
    approvedPosts: any[];
}


export default function CommunitiesPage() {
    const [communityData, setCommunityData] = useState<CommunityData | null>(null);

    useEffect(() => {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);

        axios.get(`http://localhost:8080/api/communities/${id}`)
            .then(response => {
                // Atualiza o estado com os dados da comunidade
                setCommunityData(response.data);
            })
            .catch(error => {
                // Lidar com erros
                console.error('Erro ao buscar dados da comunidade:', error);
            });
    }, []);

    return (
        <div className="bg-[#F0F2F5] min-h-screen w-full">
            <Navbar />
            <LoginModal />
            <RegisterModal />
            <div className='flex justify-center pt-[160px]'>
                <div className='w-[763px] flex bg-gray-400 h-[420px]'>
                    <div className='h-full justify-around flex items-center p-4 w-full'>
                        <AvatarUsuario size='200px' avatar={imageDefault} />
                        <div className='w-[320px] justify-center'>
                            {typeof communityData !== 'undefined' && communityData !== null && (
                                <div className='flex flex-col w-full justify-center text-center'>
                                    <h1 className='text-xl font-medium text-white'>{communityData?.nome}</h1>
                                    <p className='text-white'>{communityData?.descricao}</p>
                                    <div className="flex font-medium text-white pt-4 gap-5">
                                        <p>Membros: {Array.isArray(communityData?.membros) ? communityData.membros.length : 0}</p>
                                        <p>Quiz: {Array.isArray(communityData?.quizes) ? communityData.quizes.length : 0}</p>
                                        <p>Postagens: {Array.isArray(communityData?.approvedPosts) ? communityData.approvedPosts.length : 0}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center pt-4'>
                <div className='w-[763px] flex bg-white h-[280px] p-4 shadow-md'>
                    {communityData && communityData.quizes && communityData.quizes.map(quiz => (
                        <Quiz key={quiz.id} nome={quiz.nome} communityId={communityData.id} id={quiz.id} />
                    ))}
                </div>
            </div>
            <div className='flex justify-center pt-4'>
                <div className='w-[763px] flex bg-white'>
                    <AllPosts />
                </div>
            </div>
        </div>
    )
}
