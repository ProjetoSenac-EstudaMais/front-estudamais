import React, { createContext, useState, useEffect } from 'react';

interface UserData {
  avatar: string;
  nome: string;
  sobrenome: string;
  username: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  username: string; // Adicionando a propriedade username
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userData: null,
  setUserData: () => {},
  username: '', // Inicializando username
  setUsername: () => '',
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
        
            if (token) {
                setIsLoggedIn(true);

                const storedUsername = localStorage.getItem('username');

                if (storedUsername) {
                    setUsername(storedUsername); // Atualize o username no contexto
                }
            }
        };

        checkLoginStatus();
    }, []);

    const authContextValue: AuthContextType = {
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        username, // Adicione username ao contexto
        setUsername, // Adicione a função setUsername ao contexto
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};