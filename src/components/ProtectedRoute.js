import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem("user"));

    return userData && userData.token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
