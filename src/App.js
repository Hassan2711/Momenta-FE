import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import MyEvents from "./pages/MyEvents";
import Invitations from "./pages/Invitations";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
                <Route path="/invitations" element={<ProtectedRoute><Invitations /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
