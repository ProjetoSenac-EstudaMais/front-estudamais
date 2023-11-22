import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ErrorPage from "../pages/error"
import Homepage from "../pages/homepage"
import Login from "../pages/login"
import Profile from "../pages/profile"

// Aqui será o nosso RouterManager que irá apontar um url e uma página para aquele url
export default function RouterManager() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    )
}

// Por exemplo: <Route path="/" element={<App />} />
// Definimos o path = "/" que será o url da página
// Definimo o elemento = <App /> que será o componente resposável pela nossa página