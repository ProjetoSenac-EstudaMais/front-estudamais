import React from 'react';
import Notification from '../components/Notification';
import image from '../assets/avatarExemplo3.png';

interface NotificationDropdownProps {
    isOpen: boolean;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className='absolute top-24 right-[43rem] w-[450px] p-4 rounded-md bg-white shadow-md '>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-[14px] font-medium'>Notificações</h1>
                <p className='text-[12px] text-blue-600 cursor-pointer'>Marcar todas como lida</p>
            </div>
            <div className='flex flex-col w-ful max-h-[200px] overflow-y-auto'>
                Nenhuma notificação
            </div>
        </div>
    );
};

export default NotificationDropdown;