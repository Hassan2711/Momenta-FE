import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Error404 from "./pages/Error404";
import Invitations from "./pages/Invitations";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/error404" element={<ProtectedRoute><Error404 /></ProtectedRoute>} />
                <Route path="/invitations" element={<ProtectedRoute><Invitations /></ProtectedRoute>} />
                <Route path="/error404" element={<ProtectedRoute><Error404 /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
