import AvatarUsuario from "../components/Avatar";
import { useEffect, useState } from 'react';

import {
    FaCommentAlt,
    FaHeart,
    FaReplyAll
} from "react-icons/fa"
import ActionButton from "../components/posts/ActionButton";
import { useCommentModal } from "../hooks/useCommentModal";
import { addLike, removeLike, checkIfUserAlreadyLiked } from "../api/getLike";
import { useUserInfo } from "../api/userInfo";
import { useNavigate } from "react-router-dom";
import imageDefault from "../assets/default/imageDefault";

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
    const [liked, setLiked] = useState(true);
    const [likeColor, setLikeColor] = useState('red');
    const navigate = useNavigate();


    const handleCommentClick = () => {
        commentModal.onOpen(id);
    };
    
    const checkIfLiked = async () => {
        try {
            const userAlreadyLiked = await checkIfUserAlreadyLiked(userId, id);
            setLiked(userAlreadyLiked);
    
            // Verifica se o usuário já curtiu e define a cor do botão com base na resposta
            if (userAlreadyLiked) {
                setLikeColor('blue'); // Define a cor do botão como 'blue' se já curtiu
            } else {
                setLikeColor('red'); // Define a cor do botão como 'red' se não curtiu
            }
        } catch (error) {
            console.error('Erro ao verificar se o usuário curtiu o post:', error);
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            checkIfLiked();
        }, 500); // Atraso de 500 milissegundos (0.5 segundos)

        return () => clearTimeout(timer); // Limpa o timeout se o componente for desmontado antes do atraso
    }, [userId, id]);

    const handleLikeClick = async () => {
        try {
            if (!liked) {
                await addLike(userId, id);
                setLiked(true);
            } else {
                await removeLike(userId, id);
                setLiked(false);
            }
        } catch (error) {
            console.error('Erro ao manipular o like:', error);
        }
    };

    const handlePostClick = () => {
        navigate(`/post/${id}`);
    };

    return (
        <>
            <div className="w-[763px] p-4 cursor-pointer hover:bg-gray-50 duration-300">
                <div onClick={handlePostClick} className="flex flex-row gap-4">
                    <a href={`/profile/${username}`}><AvatarUsuario avatar={avatarPost || imageDefault} size="65px" /></a>
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
                        color={liked ? 'blue-600' : ''}
                    />
                    <ActionButton icon={<FaReplyAll />} count={replys} onClick={() => { }} />
                </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 border-opacity-50" />
        </>
    )
}