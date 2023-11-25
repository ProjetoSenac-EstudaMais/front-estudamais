import AvatarUsuario from "../components/Avatar";
import { useState } from 'react';
import Avatar from "../assets/default_user.jpg";
import PesquisaInput from "../components/Pesquisa";
import Button from "../components/Button";
import useUserInfo from "../api/userInfo";
import { newPost } from "../api/newPost";
import toast from "react-hot-toast";

export default function ShareIdea({ username }: { username: string }) {
  const { userData } = useUserInfo(username);
  const [conteudo, setConteudo] = useState('');

  const handlePostar = async () => {
    if (conteudo.trim() === '') {
      console.error('O conteúdo não pode estar vazio.');
      return;
    }

    try {
      await newPost(conteudo, userData?.id || 0);
      setConteudo(''); // Limpa o campo após postar
      console.log('Postagem realizada com sucesso!');
      toast.success("Postagem realizada com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar a postagem:', error);
      // Tratamento de erro, se necessário
    }
  };


  return (
    <div className="w-[763px] h-[151px] bg-white rounded-md shadow">
      <div className="flex h-[91px] gap-3 px-4 items-center">
        <AvatarUsuario avatar={ userData?.avatar || Avatar } size="65px" />
        <PesquisaInput
          texto={`Compartilhe sua ideia, ${userData?.nome} ${userData?.sobrenome}`}
          value={conteudo}
          onchange={(e: any) => setConteudo(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-end px-4">
        <div className="w-1/3">
          <Button label="Postar" onClick={handlePostar} />
        </div>
      </div>
    </div>
  )
}
