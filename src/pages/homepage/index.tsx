import Navbar from '../../layout/navbar';
import ShareIdea from '../../layout/shareIdea';
import LoginModal from '../../components/modals/LoginModal';
import RegisterModal from '../../components/modals/RegisterModal';
import { Toaster } from 'react-hot-toast';
import AllPosts from '../../components/posts/AllPosts';
import CommentModal from '../../components/modals/CommentModal';

export default function Homepage() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const username = nomeUsuario ? nomeUsuario : ''

    console.log('Nome do usuário:', nomeUsuario);

    return (
        <div className="bg-[#F0F2F5] min-h-screen w-full">
            <Toaster />
            <Navbar />
            <LoginModal />
            <RegisterModal />
            <CommentModal />
            <div className='flex w-full justify-center pt-[140px]'>
                <div className='flex bg-white justify-around w-[763px] rounded-md'>
                    <div className='flex flex-col items-center justify-center p-4 hover:bg-gray-200 cursor-pointer  hover:text-white duration-300 w-full'>
                        <h1 className='text-[#444444] font-medium text-base'>Para você</h1>
                        <div className='h-[4px] w-1/5 bg-blue-600 rounded-md' />
                    </div>

                    <div className='min-h-full w-[1px] bg-[#444444]' />

                    <div className='flex flex-col items-center justify-center p-4 hover:bg-gray-200 cursor-pointer  duration-300 w-full'>
                        <h1 className='text-[#444444] text-base'>Seguindo</h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
            {username && ( // Verifica se username está preenchido
                <div className="flex justify-center mt-4">
                    <ShareIdea username={username} />
                </div>
            )}
            </div>
            <div className="flex flex-col justify-center items-center w-full pt-4">
                <div className="bg-white rounded-md shadow-md pb-1 mb-4">
                    <AllPosts />
                </div>
            </div>
        </div>
    );
}
