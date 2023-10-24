import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getLocalStorageObject } from '../Services/util';
import CryptoJS from 'crypto-js';
import { LOCAL_OBJECT_SECRET_KEY, POST_API, VERIFY_TOKEN } from '../Services/api';

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white opacity-75 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-r-2 border-b-2 border-blue-700"></div>
        </div>
    );
};

const ProtectedRoute = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = getLocalStorageObject('token');
        const loggedInUser =
            user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const userData = JSON.parse(loggedInUser);

        async function verifyTokenIsValid(token) {
            const verifyTokenData = await POST_API(VERIFY_TOKEN, { token: token });
            if (verifyTokenData?.valid) {
                setUserLoggedIn(true);
                navigate('/');
                setLoading(false);
            } else {
                setUserLoggedIn(false);
                navigate('/login');
                setLoading(false);
            }
        }

        if (userData?.token) {
            verifyTokenIsValid(userData?.token);
        } else {
            setUserLoggedIn(false);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <Loader />; // Display the loader while loading
    }

    return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
