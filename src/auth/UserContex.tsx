import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    loggedInUser: any;
    setLoggedInUsername: (username: string) => void;
}

const UserContext = createContext<UserContextType>({
    loggedInUser: { nomeUsuario: '' },
    setLoggedInUsername: () => {},
});


interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState('');

    const setLoggedInUsername = (username: string) => {
        setLoggedInUser(username);
    };

    return (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUsername }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser deve ser utilizado dentro de um UserProvider');
    }
    return context;
};