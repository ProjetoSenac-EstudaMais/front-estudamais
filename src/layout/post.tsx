import AvatarUsuario from "../components/Avatar";
import userDefault from "../assets/default_user.jpg";
import axios from 'axios';
import { useEffect, useState } from 'react';

import {
    FaCommentAlt,
    FaHeart,
    FaReplyAll
} from "react-icons/fa"
import ActionButton from "../components/posts/ActionButton";
import { useCommentModal } from "../hooks/useCommentModal";
import addLike from "../api/addLike";
import { useUserInfo } from "../api/userInfo";
import { useNavigate } from "react-router-dom";

interface CustomProps {
    id: number,
    nome: string,
    sobrenome: string,
    username: string,
    tempo: string,
    conteudo: string,
    avatarPost: string,
    likes: number,
    comments: number,
    replys: number
}

export default function Post({ id, nome, sobrenome, username, tempo, conteudo, avatarPost, likes, comments, replys }: CustomProps) {
    const commentModal = useCommentModal();
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const userName = nomeUsuario ? nomeUsuario : ''
    const { userData } = useUserInfo(userName);
    const userId = userData?.id;
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();


    const handleCommentClick = () => {
        commentModal.onOpen(id);
    };

    const checkIfLiked = async () => {
        // Lógica para verificar no backend se o usuário já deu like na postagem
        // Use uma rota no backend para verificar se o usuário deu like
        // Exemplo fictício:
        const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
        setLiked(response.data.liked); // Define o estado do liked com base na resposta do backend
    };

    useEffect(() => {
        checkIfLiked();
    }, [id, userId]);

    const handleLikeClick = async () => {
        try {
            if (!liked) {
                await addLike(userId, id);
                setLiked(true); // Marca o post como liked após clicar no botão
                // Lógica adicional após adicionar o like, se necessário
            } else {
                // Lógica para remover o like (se você quiser permitir remoção de like)
            }
        } catch (error) {
            console.error('Erro ao adicionar o like:', error);
            // Tratamento de erro, se necessário
        }
    };

    const handlePostClick = () => {
        navigate(`/post/${id}`);
    };

    return (
        <>
            <div className="w-[763px] p-4 cursor-pointer hover:bg-gray-50 duration-300">
                <div onClick={handlePostClick} className="flex flex-row gap-4">
                    <a href={`/profile/${username}`}><AvatarUsuario avatar={avatarPost || userDefault} size="65px" /></a>
                    <div className="flex flex-col w-full">
                        <div className="flex gap-2 items-center">
                            <a href={`/profile/${username}`} className="text-neutral-700 text-xl ">{nome} {sobrenome}</a>
                            <p className="text-gray-400 pt-1 text-[14px]">@{username}</p>
                            <p className="text-[#D9D9D9] pt-1 text-[14px]">{tempo}</p>
                        </div>
                        <p className="pt-1">{conteudo}</p>
                    </div>
                </div>
                <div className="flex flex-row pl-20 pt-4 gap-4 text-[#C5C5C5]">
                    <ActionButton icon={<FaCommentAlt />} count={comments} onClick={handleCommentClick} postId={id} />
                    <ActionButton 
                    icon={<FaHeart />} 
                    count={likes} 
                    onClick={handleLikeClick} 
                    postId={id} 
                    color={liked ? 'blue' : 'red'}
                    />
                    <ActionButton icon={<FaReplyAll />} count={replys} onClick={() => { }} />
                </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 border-opacity-50" />
        </>
    )
}