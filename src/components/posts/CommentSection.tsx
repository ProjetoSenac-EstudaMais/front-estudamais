import AvatarUsuario from '../Avatar'
import Button from '../Button'

interface CustomProps {
    avatar: string,
    value: string,
    onchange: any,
    onclick: () => void
}

export default function CommentSection({avatar, value, onchange, onclick}: CustomProps) {
    return (
        <>
            <div className='flex flex-row gap-4 pt-4'>
                <AvatarUsuario avatar={avatar} size="65px" />
                <input
                    type="text"
                    placeholder='Escreva sua resposta'
                    className='text-xl outline-none w-full overflow-y-auto'
                    value={value}
                    onChange={onchange}
                />
            </div>
            <div className='flex w-full justify-end'>
                <div className='w-1/5'>
                    <Button
                        label='Responder'
                        onClick={onclick}
                    />
                </div>
            </div>
        </>
    )
}
