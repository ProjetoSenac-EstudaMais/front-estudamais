import { useNavigate } from 'react-router-dom'
import Button from './Button'

interface CustomProps {
    nome: String,
    communityId: number, 
    id: number,
}

export default function Quiz({nome, communityId, id}: CustomProps) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/communities/${communityId}/${id}`)
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='bg-gray-400 w-[165px] h-[165px]'></div>
            <h1 className='font-medium'>{nome}</h1>
            <Button onClick={handleNavigate} label='Fazer o quiz' />
        </div>
    )
}
