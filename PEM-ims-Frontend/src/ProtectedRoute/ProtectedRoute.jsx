import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("access");
    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return <Navigate to="/signin" replace />;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;
