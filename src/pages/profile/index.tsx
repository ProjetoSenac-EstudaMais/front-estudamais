import Navbar from "../../layout/navbar";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import Button from "../../components/Button";
import { useLocation } from 'react-router-dom';
import imageDefault from '../../assets/default/imageDefault';
import AvatarUsuario from "../../components/Avatar";
import { useUserInfo, useUserProfileInfo } from "../../api/userInfo";
import { useState, useEffect } from 'react';
import { getFollowersCount, getFollowingCount, getPostsCount } from '../../api/getProfileInfo';
import UserPosts from "../../components/posts/UserPosts";
import { checkIfUserIsFollowing, deixarDeSeguirUsuario, seguirUsuario } from "../../api/getFollow";
import LoginModal from "../../components/modals/LoginModal";
import RegisterModal from "../../components/modals/RegisterModal";
import CommentModal from "../../components/modals/CommentModal";
import { Toaster } from 'react-hot-toast';

export default function Profile() {
    // Dados do usuario pelo pathname
    const location = useLocation();
    const { pathname } = location;
    const username = pathname.split('/profile/')[1];
    const { userData } = useUserInfo(username);
    const userId = userData?.id;

    // Dados usuario logado
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const loggedUsername = nomeUsuario ? nomeUsuario : '';
    const { userLoggedData } = useUserProfileInfo(loggedUsername);
    const loggedUserId = userLoggedData?.id;


    const [isFollowing, setIsFollowing] = useState(false); // Estado para verificar se está seguindo o usuário


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

    useEffect(() => {
        const checkIfFollowing = async () => {
            if (userId && loggedUserId) {
                const isUserFollowing = await checkIfUserIsFollowing(userId, loggedUserId);
                setIsFollowing(isUserFollowing);
            }
        };

        checkIfFollowing();
    }, [userId, loggedUserId]);

    const handleFollowClick = async () => {
        if (userId !== undefined && loggedUserId !== undefined) {
            if (!isFollowing) {
                await seguirUsuario(userId, loggedUserId);
                setIsFollowing(true);
            }
        }
    };

    const handleUnfollowClick = async () => {
        if (userId !== undefined && loggedUserId !== undefined) {
            if (isFollowing) {
                await deixarDeSeguirUsuario(userId, loggedUserId);
                setIsFollowing(false);
            }
        }
    };

    return (
        <div className="bg-[#F0F2F5] min-h-screen w-full">
            <Toaster />
            <Navbar />
            <LoginModal />
            <RegisterModal />
            <CommentModal />
            <div className="flex justify-center items-center pt-[140px] w-full flex-col">
                {/* Área de exibição do avatar */}
                <div className="bg-gray-200 w-[763px] h-[246px] flex justify-center items-center">
                    <AvatarUsuario avatar={userData?.avatar || imageDefault} size="222px" />
                </div>

                {/* Informações do usuário */}
                <div className="bg-white justify-center w-[763px] flex flex-col items-center">
                    {userData ? (
                        <>
                            <h1 className="text-2xl pt-4 font-medium">{userData.nome} {userData.sobrenome}</h1>
                            <div className="flex gap-12 py-4">
                                <div className="flex gap-12 py-4">
                                    <div className="flex flex-col items-center">
                                        <p className="text-xl">{followingCount}</p>
                                        <p className="text-xl">Seguidores</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="text-xl">{followersCount}</p>
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
                    {!loggedUserId || (loggedUserId !== userId && (
                        <Button
                            icon={isFollowing ? FaUserCheck : FaUserPlus}
                            color={isFollowing ? "seguindo" : "seguir"}
                            label={isFollowing ? "Seguindo" : "Seguir"}
                            onClick={isFollowing ? handleUnfollowClick : handleFollowClick}
                        />
                    ))}
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