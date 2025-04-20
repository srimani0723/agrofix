import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const role = Cookies.get("role");
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken === undefined) {
        <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/not-found" />;
    }

    return children;
};

export default ProtectedRoute;