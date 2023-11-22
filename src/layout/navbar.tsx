import Logo from "../assets/logo.png"
import AvatarUsuario from "../components/avatarUsuario"
import Avatar from "../assets/avatarExemplo.png"
import PesquisaInput from "../components/pesquisaInput"
import {
    FaHome,
    FaUsers,
    FaBell
} from "react-icons/fa";

export default function Navbar() {
    return (
        <div className="bg-white h-[125px] w-full flex items-center justify-center top-0 absolute z-20">
            <div className="w-[763px] flex justify-between items-center">
                <div className="flex gap-7 items-center w-[425px]">
                    <img src={Logo} alt="logo" />
                    <PesquisaInput texto="Pesquise no Estuda+" />
                </div>
                <div className="text-3xl text-black flex w-[165px] justify-between">
                    <FaHome />
                    <FaUsers />
                    <FaBell />
                </div>
                <div className="w-[65px] h-[65px] flex ">
                    <AvatarUsuario avatar={Avatar} />
                </div>
            </div>
        </div>
    )
}
