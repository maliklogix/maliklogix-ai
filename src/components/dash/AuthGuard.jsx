import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const isAdmin = sessionStorage.getItem('ml_admin') === 'true';

    if (!isAdmin) {
        return <Navigate to="/dash/login" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;
