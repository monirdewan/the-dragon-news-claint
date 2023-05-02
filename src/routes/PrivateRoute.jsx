import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    console.log(location)
    const {user, loading} = useContext(AuthContext)
    if(loading){
        return <div className='d-flex justify-content-center '><Spinner className='' animation="border" variant="primary" /></div>;
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;