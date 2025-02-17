import React, { Children, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user , loading } = useContext(AuthContext)
    const location = useLocation();

    if(loading){
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-warning"></span></div>
    }
    if(user) {
        return children
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
};

export default PrivateRoute;