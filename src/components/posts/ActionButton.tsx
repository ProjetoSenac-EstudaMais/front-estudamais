import { ReactNode } from 'react';

interface CustomProps {
    icon: ReactNode; // Permitindo ícones como elementos React
    count: number;
    onClick: () => void; // Função que não retorna nada (void)
    postId?: number;
    color?: string;
}

const ActionButton: React.FC<CustomProps> = ({ icon, count, onClick, postId, color }: CustomProps) => {
    return (
        <div className={`flex items-center text-${color} gap-2 text-base hover:text-blue-600 duration-100 cursor-pointer`} onClick={onClick}>
            {icon}
            <h1>{count}</h1>
        </div>
    );
};

export default ActionButton;