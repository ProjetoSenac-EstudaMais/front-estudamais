import AvatarUsuario from "../Avatar";

interface CustomProps {
    id: number,
    username: string,
    avatar: string,
    nome: string,
    sobrenome: string,
    conteudo: string,
}

export default function AnswersPost({ id, username, avatar, nome, sobrenome, conteudo }: CustomProps) {
    return (
        <>
            <div className="w-full h-[1px] bg-gray-300 border-opacity-50" />
            <div className="w-[763px] p-4 flex">
                <div className="flex flex-row gap-4"></div>
                <div key={id} className="flex flex-col">
                    <div className="flex flex-row gap-4 items-center h-full">
                        <a href={`/profile/${username}`}> <AvatarUsuario avatar={avatar || ''} size="45px" /></a>
                    </div>
                </div>
                <div className="pl-6 flex gap-4 flex-col">
                    <div className="flex flex-col w-full">
                        <div className="flex gap-2 items-center">
                            <a href={`/profile/${username}`} className="text-neutral-700 text-xl ">{nome} {sobrenome}</a>
                            <p className="text-gray-400 pt-1 text-[14px]">@{username}</p>
                            <p className="text-[#D9D9D9] pt-1 text-[14px]">• 1 hora atrás</p>
                        </div>
                        <p className="pt-1">{conteudo}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
