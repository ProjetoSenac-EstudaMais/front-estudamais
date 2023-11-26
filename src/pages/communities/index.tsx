import { useEffect, useState } from 'react';
import Navbar from '../../layout/navbar';
import LoginModal from '../../components/modals/LoginModal';
import RegisterModal from '../../components/modals/RegisterModal';
import getCommunities from '../../api/getCommunities';
import CommunitiesCard from '../../layout/communitiesCard';

export default function Communities() {
    const [communities, setCommunities] = useState<any[]>([]);

    useEffect(() => {
        async function fetchCommunities() {
            try {
                const fetchedCommunities = await getCommunities();
                setCommunities(fetchedCommunities);
            } catch (error) {
                console.error('Erro ao buscar as comunidades:', error);
            }
        }

        fetchCommunities();
    }, []);

    return (
        <div className="bg-[#F0F2F5] min-h-screen w-full">
            <Navbar />
            <LoginModal />
            <RegisterModal />
            <div className='flex justify-center pt-[140px]'>
                <div className='w-[762px]'>
                    {communities.map((community) => (
                        <CommunitiesCard
                        nome={community.nome}
                        about={community.descricao}
                        quiz={community.quizes.length}
                        posts={community.approvedPosts.length}
                        members={community.membros.length}
                        id={community.id}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}
