import Navbar from "../../layout/navbar";
import { FaUserPlus } from "react-icons/fa";
import Button from "../../components/Button";
import { useLocation } from 'react-router-dom';
import userDefault from "../../assets/default_user.jpg";
import AvatarUsuario from "../../components/Avatar";
import useUserInfo from "../../api/userInfo";
import { useState, useEffect } from 'react';
import { getFollowersCount, getFollowingCount, getPostsCount } from '../../api/getProfileInfo';
import UserPosts from "../../components/posts/UserPosts";

export default function Profile() {
    const location = useLocation();
    const { pathname } = location;
    const username = pathname.split('/profile/')[1];
    const { userData } = useUserInfo(username);
    const userId = userData?.id;

    console.log(userData);


    const [followersCount, setFollowersCount] = useState<number>(0);
    const [followingCount, setFollowingCount] = useState<number>(0);
    const [postsCount, setPostsCount] = useState<number>(0);

    useEffect(() => {
        const fetchFollowersCount = async () => {
            if (userId) {
                const count = await getFollowersCount(userId);
                setFollowersCount(count);
            }
        };

        fetchFollowersCount();
    }, [userId]);

    useEffect(() => {
        const fetchFollowingCount = async () => {
            if (userId) {
                const count = await getFollowingCount(userId);
                setFollowingCount(count);
            }
        };

        fetchFollowingCount();
    }, [userId]);

    useEffect(() => {
        const fetchPostsCount = async () => {
            if (userId) {
                const count = await getPostsCount(userId);
                setPostsCount(count);
            }
        };

        fetchPostsCount();
    }, [userId]);

    return (
        <div className="bg-[#F0F2F5] min-h-screen w-full">
            <Navbar />
            <div className="flex justify-center items-center pt-[140px] w-full flex-col">
                {/* Área de exibição do avatar */}
                <div className="bg-gray-200 w-[763px] h-[246px] flex justify-center items-center">
                    <AvatarUsuario avatar={userData?.avatar || userDefault} size="222px" />
                </div>

                {/* Informações do usuário */}
                <div className="bg-white justify-center w-[763px] flex flex-col items-center">
                    {userData ? (
                        <>
                            <h1 className="text-2xl pt-4 font-medium">{userData.nome} {userData.sobrenome}</h1>
                            <div className="flex gap-12 py-4">
                                <div className="flex gap-12 py-4">
                                    <div className="flex flex-col items-center">
                                        <p className="text-xl">{followersCount}</p>
                                        <p className="text-xl">Seguidores</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-xl">{followingCount}</p>
                                        <p className="text-xl">Seguindo</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-xl">{postsCount}</p>
                                        <p className="text-xl">Postagens</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[410px] h-[1px] bg-neutral-700"></div>
                        </>
                    ) : (
                        <p>Dados do usuário não encontrados</p>
                    )}
                </div>

                {/* Botões e outras ações */}
                <div className="flex justify-between w-[763px] px-44 py-4 gap-5 bg-white">
                    <Button icon={FaUserPlus} label="Seguir" onClick={() => { }} />
                    <Button label="XP: 350" onClick={() => { }} />
                </div>

                {/* Posts ou outras informações adicionais */}
                <div className="w-[763px] h-[1px] bg-neutral-700 border-opacity-50" />
                <div className="flex justify-center items-center w-full">
                    <div className="bg-white pt-4 mb-4">
                        <UserPosts userId={userId || 0} />
                    </div>
                </div>
            </div>
        </div>
    )
}