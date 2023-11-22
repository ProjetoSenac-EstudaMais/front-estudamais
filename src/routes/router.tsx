import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import App from "../App"
import ErrorPage from "../pages/error"

export default function RouterManager() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Router>
    )
}