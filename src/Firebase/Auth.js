import React, {useState, useEffect} from 'react';
import {auth} from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
                setCurrentUser(currentUser);
        });
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
    
}