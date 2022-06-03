import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { db } from '../Firebase/firebase-config';
import {doc, getDoc} from 'firebase/firestore';
import { AuthContext } from '../Firebase/Auth';

const ProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState("");
    const {currentUser} = useContext(AuthContext);
    const userRef = doc(db, "users", currentUser.uid);


    useEffect(() => {
        const getProfilePicture = () => {
            
            getDoc(userRef).then((doc) => {
                setProfilePicture(doc.data().profilePicture);
            });
        }
        getProfilePicture();
    }, []);
    
    return (
        <img id="profilePicture" src={profilePicture} alt="profilePicture" />
    );
};

export default ProfilePicture;