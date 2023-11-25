import AvatarUsuario from "./Avatar";

interface NotificationProps {
    avatar: string,
    name: string,
    action: string,
    date: string,

}

export default function Notification({ avatar, name, action, date }: NotificationProps) {
    return (
        <div className="w-full flex justify-between items-center gap-2">
            <div className="flex flex-row items-center gap-4">
                <AvatarUsuario avatar={avatar} size="45px" />
                <div className="flex flex-col">
                    <h1 className="font-medium">{name}</h1>
                    <p>{action}</p>
                    <p className="text-blue-600">{date}</p>
                </div>
            </div>
            <div className="flex justify-end w-1/3">
                <div className="bg-blue-600 w-5 h-5 rounded-full" />
            </div>
        </div>
    )
}
