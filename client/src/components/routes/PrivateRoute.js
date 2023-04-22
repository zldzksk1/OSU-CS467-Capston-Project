import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';

const PrivateRoute = ({ component: Component }) => {
    const [authState] = useAuth();
    const { isAuthenticated, loading } = authState;

    return !isAuthenticated && !loading ? <Navigate to='/login' /> : <Component />
}

export default PrivateRoute
