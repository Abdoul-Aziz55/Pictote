import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../Firebase/firebase-config';
import {doc, getDoc} from 'firebase/firestore';

const ProfilePicture = ({userUid}) => {
    const [profilePicture, setProfilePicture] = useState("");

    useEffect(() => {
        const userRef = doc(db, "users", userUid);
        getDoc(userRef).then((doc) => {
            setProfilePicture(doc.data().profilePicture);
        });
    });
    

    return (
        <img id="profilePicture" src={profilePicture} alt="profilePicture" />
    );
};

export default ProfilePicture;