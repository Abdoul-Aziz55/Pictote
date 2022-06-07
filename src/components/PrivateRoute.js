import React, {useContext} from 'react';
import {AuthContext} from '../Firebase/Auth';
import { Navigate } from 'react-router-dom';



const PrivateRoute = ({ Component, alternativePath }) => {
    /***
     * ce composant permet d afficher un composant si l utilisateur est connecte ou de rediriger
     *  vers une page alternative si l utilisateur n est pas connecte
     */
    const {currentUser} = useContext(AuthContext);
    return (
            currentUser ? 
                Component
             : 
                <Navigate to={alternativePath}/>
            
    );
};

export default PrivateRoute;