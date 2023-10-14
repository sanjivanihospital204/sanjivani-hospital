import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
        setLoading(false);

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
