import Post from "../../layout/post";
import Avatar from "../../assets/avatarExemplo2.png"
import AvatarUsuario from "../../components/avatarUsuario";

export default function Profile() {
    return (
        <>
            <div className="bg-white pb-[2rem] border-t-[1rem] mt-[2rem] flex flex-col justify-center items-center max-h-[100%] overflow-y-auto border-b-[1px solid #444]">
                <div className=" h-[70%] bg-cover bg-center items-center justify-center">
                    <AvatarUsuario avatar={Avatar} />
                </div>

                <div className="w-full flex flex-col items-center justify-center">
                    <h1>Kazuha Nakamura</h1>

                    <div className="flex gap-5">
                        <div className="flex-col flex items-center">
                            Seguindo <strong>100</strong>
                        </div>

                        <div className="flex-col flex items-center">
                            Seguidores <strong>100</strong>
                        </div>

                        <div className="flex-col flex items-center">
                            Contribuições <strong>100</strong>
                        </div>
                    </div>

                    <div>
                        <button>Seguir:</button>
                        <button>XP: 385</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center w-full pt-4">
                <div className="bg-white rounded-md shadow-md">
                    <Post
                        avatarPost={Avatar}
                        nome="Jeon Jungkook"
                        tempo="2 Horas atrás"
                        conteudo="7 Dias da semana nesse projeto que não acaba nunca, estou fazendo um programa utilizando JavaSwing pelo eclipse, socorro!"
                        likes="7"
                        comments="7"
                        replys="7"
                    />
                </div>
            </div>
        </>

    )
}
