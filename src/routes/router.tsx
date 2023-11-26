import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import ErrorPage from "../pages/error"
import Homepage from "../pages/homepage"
import Profile from "../pages/profile"
import Communities from "../pages/communities"
import PostPage from "../pages/postPage"

// Aqui será o nosso RouterManager que irá apontar um url e uma página para aquele url
export default function RouterManager() {
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Homepage />} /> 
                <Route path="/404" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/post/:postId" element={<PostPage />} />
                <Route path="/communities" element={<Communities />} />
            </Routes>
        </Router>
    )
}

// Por exemplo: <Route path="/" element={<App />} />
// Definimos o path = "/" que será o url da página
// Definimo o elemento = <App /> que será o componente resposável pela nossa página