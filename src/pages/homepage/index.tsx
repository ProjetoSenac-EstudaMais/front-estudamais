import Navbar from "../../layout/navbar";
import Post from "../../layout/post";
import ShareIdea from "../../layout/shareIdea";
import Avatar from "../../assets/avatarExemplo2.png"
import Avatar2 from "../../assets/avatarExemplo3.png"

export default function Homepage() {
    return (
        <div className="bg-[#F0F2F5] min-h-screen w-full">
            <Navbar />
            <div className="flex justify-center pt-[140px]">
                <ShareIdea />
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
                    <Post
                        avatarPost={Avatar2}
                        nome="Henrique Silveira"
                        tempo="2 Horas atrás"
                        conteudo="7 Dias da semana nesse projeto que não acaba nunca, estou fazendo um programa utilizando JavaSwing pelo eclipse, socorro!"
                        likes="7"
                        comments="7"
                        replys="7"
                    />
                </div>
            </div>
        </div>
    )
}
