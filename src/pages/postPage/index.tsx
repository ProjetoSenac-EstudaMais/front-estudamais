import CommentModal from "../../components/modals/CommentModal";
import LoginModal from "../../components/modals/LoginModal";
import RegisterModal from "../../components/modals/RegisterModal";
import Navbar from "../../layout/navbar";
import { Toaster, toast } from 'react-hot-toast';
import userDefault from '../../assets/default_user.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { PostData } from "../../api/getPosts";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Post from "../../layout/post";
import AnswersPost from "../../components/posts/AnswersPost";
import CommentSection from "../../components/posts/CommentSection";
import { useUserInfo } from "../../api/userInfo";
import { sendComment } from "../../api/sendComment";

export default function PostPage() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const username = nomeUsuario ? nomeUsuario : ''
    const { userData } = useUserInfo(username);

    const [commentContent, setCommentContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [post, setPost] = useState<PostData | null>(null);
    const { postId } = useParams();
    const postIdNumber = postId ? parseInt(postId, 10) : undefined;
    const navigate = useNavigate();

    const handleCommentContentChange = (event: any) => {
        setCommentContent(event.target.value);
    };

    const handleCommentSubmit = async () => {
        if (postIdNumber !== undefined && userData?.id && commentContent) {
            try {
                setIsLoading(true);
                await sendComment(postIdNumber, userData.id, commentContent);
                console.log('Comentário enviado com sucesso');
                toast.success('Comentário enviado com sucesso!');
            } catch (error) {
                console.error('Erro ao enviar o comentário:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };


    useEffect(() => {
        // Lógica para buscar o post específico com base no ID
        const fetchPostById = async () => {
            if (postId) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
                    if (response.status === 200) {
                        setPost(response.data);
                        console.log(response.data);
                    } else {
                        throw new Error('Erro ao buscar o post');
                    }
                } catch (error) {
                    console.error('Erro ao buscar o post:', error);
                }
            }
        };

        fetchPostById();
    }, [postId]);

    console.log('Nome do usuário:', nomeUsuario);

    const BackHome = () => {
        navigate("/")
    }

    return (
        <div className="bg-[#F0F2F5] min-h-screen w-full">
            <Toaster />
            <Navbar />
            <LoginModal />
            <RegisterModal />
            <CommentModal />
            <div className='flex w-full justify-center pt-[140px] mb-4'>
                <div className='flex flex-col bg-white justify-around w-[763px] rounded-md'>
                    <div className="flex items-center gap-4 p-4">
                        <div className="cursor-pointer" onClick={BackHome}>
                            <FaArrowLeft />
                        </div>
                        <h1 className="text-xl">Post</h1>
                    </div>
                    {post && ( // Verifica se post não é null antes de renderizar
                        <Post
                            id={post.id}
                            key={post.id}
                            nome={post.autor?.nome || ''} // Verifica se autor existe antes de acessar nome
                            sobrenome={post.autor?.sobrenome || ''} // Verifica se autor existe antes de acessar sobrenome
                            username={post.autor?.username || ''}
                            tempo="• 1 hora atrás"
                            conteudo={post.conteudo || ''}
                            avatarPost={post.autor?.avatar || ''}
                            likes={post.likes ? post.likes.length : 0}
                            comments={post.comentarios ? post.comentarios.length : 0}
                            replys={post.numeroReposts || 0}
                        />
                    )}
                    <div className="p-4">
                        <CommentSection
                            avatar={userData?.avatar || userDefault}
                            value={commentContent}
                            onchange={handleCommentContentChange}
                            onclick={handleCommentSubmit}
                        />
                    </div>
                    {post?.comentarios && (
                        <div>
                            {post.comentarios.map((comentario) => (
                                <AnswersPost
                                    id={comentario.id}
                                    username={comentario.autor?.username}
                                    avatar={comentario.autor?.avatar || ''}
                                    nome={comentario.autor.nome}
                                    sobrenome={comentario.autor.sobrenome}
                                    conteudo={comentario.conteudo}
                                />
                            ))}
                        </div >
                    )}
                </div>
            </div>
        </div >
    )
}
