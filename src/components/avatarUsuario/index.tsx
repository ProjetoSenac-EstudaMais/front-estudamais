interface CustomProps {
    avatar: string,
}

export default function AvatarUsuario({avatar}: CustomProps) {
  return (
    <img className="w-[65px] h-[65px] rounded-full" src={avatar} alt="AvatarUser" />
  )
}
