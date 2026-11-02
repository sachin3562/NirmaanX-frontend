
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRole }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    // No token: redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);

        // Check token expiration
        if (!decoded.exp || decoded.exp * 1000 <= Date.now()) {
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }

        // Check user role
        if (allowedRole && decoded.role !== allowedRole) {
            const dashboards = {
                CUSTOMER: "/customer/dashboard",
                CONTRACTOR: "/contractor/dashboard",
                ADMIN: "/admin/dashboard",
                ENGINEER: "/engineer/dashboard",
                SUPPLIER: "/supplier/dashboard",
                AGENT: "/agent/dashboard"
            };

            const correctDashboard = dashboards[decoded.role];

            if (correctDashboard) {
                return <Navigate to={correctDashboard} replace />;
            }

            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }

        return children;

    } catch (error) {
        localStorage.removeItem("token");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
}

export default ProtectedRoute;
