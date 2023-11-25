import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import RouterManager from './routes/router.tsx'
import { AuthProvider } from './auth/AuthContext.tsx';
import { UserProvider } from './auth/UserContex.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterManager />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
);