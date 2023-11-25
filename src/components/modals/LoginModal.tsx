import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import { loginUser } from "../../api/loginUser";
import toast from "react-hot-toast";
import { useLoginModal } from "../../hooks/useLoginModal";
import { useRegisterModal } from "../../hooks/useRegisterModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
  
      const userData = {
        login: username,
        password: password
      };
  
      const user = await loginUser(userData);
      const loggedInUsername = user.username;
  
      localStorage.setItem('loggedInUsername', loggedInUsername); // Use uma chave específica para o nome de usuário
  
      toast.success('Login efetuado com sucesso!')
      loginModal.onClose();
  
      console.log('Usuário logado com sucesso!');
  
    } catch (error) {
      console.error('Erro ao logar o usuário e autenticação:', error);
      toast.error('Erro ao logar o usuário!')
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value); // Atualiza o estado username
        }}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Ainda não possui uma conta?
        <span
          onClick={onToggle}
          className="
            text-blue-600 
            cursor-pointer 
            hover:underline
            ml-1
          "
        > Criar uma conta</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Faça login na sua conta"
      actionLabel="Log in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;