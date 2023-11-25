import AvatarUsuario from "../components/Avatar"
import userDefault from "../assets/default_user.jpg"

import {
    FaCommentAlt,
    FaHeart,
    FaReplyAll
} from "react-icons/fa"
import ActionButton from "../components/posts/ActionButton";
import { useCommentModal } from "../hooks/useCommentModal";

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

    const handleCommentClick = () => {
        commentModal.onOpen(id);
    };


    return (
        <>
            <div className="w-[763px] p-4">
                <div className="flex flex-row gap-4">
                    <a href={`/profile/${username}`}><AvatarUsuario avatar={avatarPost || userDefault} size="65px" /></a>
                    <div className="flex flex-col w-full">
                        <a href={`/profile/${username}`} className="text-neutral-700 text-xl ">{nome} {sobrenome}</a>
                        <p className="text-[#D9D9D9]">{tempo}</p>
                    </div>
                </div>
                <div className="pl-20 flex gap-4 flex-col">
                    <p>{conteudo}</p>
                </div>
                <div className="flex flex-row pl-20 pt-4 gap-4 text-[#C5C5C5]">
                    <ActionButton icon={<FaCommentAlt />} count={comments} onClick={handleCommentClick} />
                    <ActionButton icon={<FaHeart />} count={likes} onClick={() => { }} />
                    <ActionButton icon={<FaReplyAll />} count={replys} onClick={() => { }} />
                </div>
            </div>
            <div className="w-full h-[1px] bg-neutral-700 border-opacity-50" />
        </>
    )
}