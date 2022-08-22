import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const PrivateComponent = ({ children }) => {
    const authContextObj = useContext(AuthContext);
    const { isLoggedIn } = authContextObj;
    return !isLoggedIn ? <Navigate to="/login" /> : children;
};

export default PrivateComponent;
