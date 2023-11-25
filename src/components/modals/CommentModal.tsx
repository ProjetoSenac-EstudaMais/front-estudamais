import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCommentModal } from "../../hooks/useCommentModal";
import CModal from '../posts/Cmodal';
import userDefault from "../../assets/default_user.jpg";
import { PostData } from '../../api/getAllPosts';
import AvatarUsuario from '../Avatar';
import useUserInfo from '../../api/userInfo';
import Input from '../Input';
import Button from '../Button';

const CommentModal = () => {
    const commentModal = useCommentModal();
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState<PostData | null>(null); // Para armazenar o post específico
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const username = nomeUsuario ? nomeUsuario : ''
    const { userData } = useUserInfo(username);

    useEffect(() => {
        // Lógica para buscar o post específico com base no ID
        const fetchPostById = async () => {
            if (commentModal.postId) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/posts/${commentModal.postId}`);
                    if (response.status === 200) {
                        setPost(response.data);
                    } else {
                        throw new Error('Erro ao buscar o post');
                    }
                } catch (error) {
                    console.error('Erro ao buscar o post:', error);
                }
            }
        };

        fetchPostById();
    }, [commentModal.postId]);

    const bodyContent = post ? (
        <>
            <div className="flex flex-row gap-4">
                <div className='flex flex-col gap-2 items-center'>
                    <a href={`/profile/${post.autor.username}`}><AvatarUsuario avatar={post.autor.avatar || userDefault} size="65px" /></a>
                    <div className='bg-gray-400 h-[60px] w-[2px]'></div>
                </div>
                <div className="flex flex-col w-full">
                    <a href={`/profile/${post.autor.username}`} className="text-neutral-700 text-xl ">{post.autor.nome} {post.autor.sobrenome}</a>
                    <p className="text-[#D9D9D9]">"há pouco tempo"</p>
                    <div className="flex gap-4 flex-col mb-4">
                        <p>{post.conteudo}</p>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <p>Respondendo a</p>
                        <p className='text-blue-600'>@{post.autor.username}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-4 pt-4'>
                <AvatarUsuario avatar={userData?.avatar || userDefault} size="55px" />
                <input type="text" placeholder='Escreva sua resposta' className='p-4 outline-none w-full overflow-y-auto' />
            </div>
            <div className='flex w-full justify-end'>
                <div className='w-1/5'>
                    <Button
                        label='Responder'
                        onClick={() => { }}
                    />
                </div>
            </div>
        </>
    ) : (
        <p>Carregando o post...</p>
    );

    const footerContent = (
        <div>

        </div>
    )

    return (
        <CModal
            disabled={isLoading}
            isOpen={commentModal.isOpen}
            title="Comentar"
            actionLabel="Responder"
            onClose={commentModal.onClose}
            onSubmit={() => { }}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default CommentModal;