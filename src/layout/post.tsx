import AvatarUsuario from "../components/avatarUsuario"
import ImageUploaded from "../assets/imageUploaded.png"

import {
    FaCommentAlt,
    FaHeart,
    FaReplyAll
} from "react-icons/fa"

interface CustomProps {
    nome: string,
    tempo: string,
    conteudo: string,
    avatarPost: string,
    likes: string,
    comments: string,
    replys: string
}

export default function Post({avatarPost, nome, tempo, conteudo, likes, comments, replys}: CustomProps) {
    return (
        <>
            <div className="w-[763px] p-4">
                <div className="flex flex-row gap-4">
                    <AvatarUsuario avatar={avatarPost} />
                    <div className="flex flex-col w-full">
                        <h1 className="text-neutral-700 text-xl ">{nome}</h1>
                        <p className="text-[#D9D9D9]">{tempo}</p>
                    </div>
                </div>
                <div className="pl-20 flex gap-4 flex-col">
                    <p>{conteudo}</p>
                    <img src={ImageUploaded} alt="imagem" className="w-[618px] h-72" />
                </div>
                <div className="flex flex-row pl-20 pt-4 gap-4 text-[#C5C5C5]">
                    <div className="flex items-center gap-2 text-base">
                        <FaCommentAlt />
                        <h1>{comments}</h1>
                    </div>
                    <div className="flex items-center gap-2 text-base text-[#0F51FD]">
                        <FaHeart />
                        <h1 className="text-[#444444]">{likes}</h1>
                    </div>
                    <div className="flex items-center gap-2 text-xl">
                        <FaReplyAll />
                        <h1 className="text-base">{replys}</h1>
                    </div>
                </div>
            </div>
            <div className="w-full h-[1px] border border-neutral-700 border-opacity-50" />
        </>
    )
}
