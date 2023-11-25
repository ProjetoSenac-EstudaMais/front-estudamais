import { useCallback, useState } from "react";

import { useLoginModal } from "../../hooks/useLoginModal";
import { useRegisterModal } from "../../hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import { registerAuth, registerUser } from "../../api/registerNewUser";
import toast from "react-hot-toast";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
  
      const userData = {
        nome: nome,
        sobrenome: sobrenome,
        username: username,
        email: email,
      };
  
      const authData = {
        login: username,
        password: password,
      };
  
      await registerUser(userData);
      await registerAuth(authData);
  
      toast.success('Conta criada com sucesso!')
  
      console.log('Usuário e autenticação registrados com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar usuário e autenticação:', error);
      toast.error('Complete todos os campos!')
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row w-full gap-4">
        <div className="w-1/2">
          <Input
            disabled={isLoading}
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <Input
            disabled={isLoading}
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </div>
      </div>
      <Input
        disabled={isLoading}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Já possui uma conta?
        <span
          onClick={onToggle}
          className="
            text-blue-600
            cursor-pointer 
            hover:underline
            ml-1
          "
        > Log in</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Criar uma conta"
      actionLabel="Registrar"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;