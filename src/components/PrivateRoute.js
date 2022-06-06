import React, {useContext} from 'react';
import {AuthContext} from '../Firebase/Auth';
import { Navigate } from 'react-router-dom';



const PrivateRoute = ({ Component, alternativePath }) => {
    const {currentUser} = useContext(AuthContext);
    return (
            currentUser ? 
                Component
             : 
                <Navigate to={alternativePath}/>
            
    );
};

export default PrivateRoute;