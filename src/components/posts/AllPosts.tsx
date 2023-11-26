import { useEffect, useState } from 'react';
import { getAllPosts, PostData } from '../../api/getAllPosts';
import Post from '../../layout/post';

const AllPosts = () => {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getAllPosts();
            setPosts(fetchedPosts);
        };

        fetchPosts();
    }, []);

    const sortedPosts = [...posts].sort((a, b) => b.id - a.id); // Ordena do maior para o menor

    return (
        <div>
            {sortedPosts.map((post: PostData) => (
                <Post
                    id={post.id}
                    key={post.id}
                    nome={post.autor.nome} 
                    sobrenome={post.autor.sobrenome} 
                    username={post.autor.username}
                    tempo="• 1 hora atrás"
                    conteudo={post.conteudo}
                    avatarPost={post.autor.avatar}
                    likes={post.likes ? post.likes.length : 0}
                    comments={post.comentarios ? post.comentarios.length : 0}
                    replys={post.numeroReposts}
                />
            ))}
        </div>
    );
};

export default AllPosts;