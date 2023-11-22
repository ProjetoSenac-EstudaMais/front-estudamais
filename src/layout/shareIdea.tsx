import AvatarUsuario from "../components/avatarUsuario";
import PesquisaInput from "../components/pesquisaInput";
import Avatar from "../assets/avatarExemplo.png"

export default function ShareIdea() {
  return (
    <div className="flex gap-3 px-4 items-center w-[763px] h-[91px] bg-white rounded-[20px] shadow">
        <AvatarUsuario avatar={Avatar} />
        <PesquisaInput texto="Compartilhe sua ideia, Kazuha" />
    </div>
  )
}
