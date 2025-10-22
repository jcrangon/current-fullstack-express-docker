import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
    const {isAuthenticated, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Outlet />;
}
