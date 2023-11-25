import React from 'react';

interface MenuDropdownProps {
    isOpen: boolean;
    username?: any; // Tornando opcional, já que o username só está presente se o usuário estiver logado
    isLoggedIn: boolean; // Nova propriedade para verificar se o usuário está logado
    onLogout: () => void;
    onLogin: () => void;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ isOpen, username, isLoggedIn, onLogout, onLogin }) => {
    if (!isOpen) {
        return null;
    }

    if (isLoggedIn && username) {
        return (
            <div className='absolute top-28 right-[36.1rem] w-[150px] rounded-md bg-white shadow-md '>
                <div className='flex flex-col w-full max-h-[200px] overflow-y-auto'>
                    <a href={`/profile/${username}`} className='hover:bg-slate-100 duration-100 w-full px-4 py-2  cursor-pointer'>Meu Perfil</a>
                    <a href="" className='hover:bg-slate-100 duration-100 w-full px-4 py-2  cursor-pointer'>Comunidades</a>
                    <p onClick={onLogout} className='hover:bg-slate-100 duration-100 w-full px-4 py-2 cursor-pointer'>Logout</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className='absolute top-28 right-[36.1rem] w-[150px] rounded-md bg-white shadow-md '>
                <div className='flex flex-col w-full max-h-[200px] overflow-y-auto'>
                    <p onClick={onLogin} className='hover:bg-slate-100 duration-100 w-full px-4 py-2 cursor-pointer'>Fazer login</p>
                </div>
            </div>
        );
    }
};

export default MenuDropdown;
