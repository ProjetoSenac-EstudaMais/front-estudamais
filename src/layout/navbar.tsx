import Logo from "../assets/logo.png"
import { useLoginModal } from "../hooks/useLoginModal"
import PesquisaInput from "../components/Pesquisa";

import {
    FaHome,
    FaUsers,
    FaBell
} from "react-icons/fa";
import { useState, useContext } from "react";
import NotificationDropdown from "./notificationDropdown";
import AvatarUsuario from "../components/Avatar";
import { logoutUser } from "../api/loginUser";
import { AuthContext } from "../auth/AuthContext";
import { useUserInfo } from "../api/userInfo";
import MenuHamburguer from "../components/menuHamburguer";
import MenuDropdown from "./menuDropdown";
import AvatarUsuarioDefault from "../components/AvatarDefault";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const loginModal = useLoginModal();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const username = nomeUsuario ? nomeUsuario : ''
    const { userData } = useUserInfo(username);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logoutUser();
        setIsLoggedIn(false);
    };

    const handleLoginClick = () => {
        loginModal.onOpen();
    };

    const handleToMenu = () => {
        navigate(`/profile/${username}`)
    }

    return (
        <div className="bg-white h-[125px] w-full flex items-center justify-center top-0 z-20 fixed shadow-md">
            <div className="w-[763px] flex justify-between items-center">
                <div className="flex gap-7 items-center w-[410px]">
                    <img src={Logo} alt="logo" />
                    <PesquisaInput texto="Pesquise no Estuda+" value={""} onchange={() => {}}/>
                </div>
                <div className="text-3xl text-black flex w-[165px] justify-between">
                    <a href="/"><FaHome className="cursor-pointer" /></a>
                    <div onClick={handleToMenu}><FaUsers className="cursor-pointer" /></div>
                    <div onClick={toggleDropdown}><FaBell className="cursor-pointer" /></div>
                </div>
                <div className="w-[65px] h-[65px] flex cursor-pointer">
                    {username ? (
                        <div onClick={handleToMenu}>
                            <AvatarUsuario avatar={userData?.avatar || ''} size="65px" />
                        </div>
                    ) : (
                        <AvatarUsuarioDefault size="65px" />
                    )}

                </div>
                <div className="cursor-pointer" onClick={toggleMenu}>
                    <MenuHamburguer />
                </div>
            </div>
            <NotificationDropdown isOpen={isDropdownOpen} />
            <MenuDropdown isLoggedIn={isLoggedIn} isOpen={isMenuOpen} username={userData?.username} onLogout={handleLogout} onLogin={handleLoginClick} />
        </div>
    )
}
