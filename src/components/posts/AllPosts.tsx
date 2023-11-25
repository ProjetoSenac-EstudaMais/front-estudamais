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

    return (
        <div>
            {posts.map((post: PostData) => (
                <Post
                    id={post.id}
                    key={post.id}
                    nome={post.autor.nome} 
                    sobrenome={post.autor.sobrenome} 
                    username={post.autor.username}
                    tempo="Há pouco tempo"
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