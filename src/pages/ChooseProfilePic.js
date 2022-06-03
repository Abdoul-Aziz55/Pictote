import React, {useState, useContext} from 'react';
import { db, storage } from '../Firebase/firebase-config';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate, Navigate } from 'react-router';
import { AuthContext } from '../Firebase/Auth';

const ChooseProfilePic = () => {
    const navigate = useNavigate();

    const [profilePictureURL, setProfilePictureURL]= useState(null);

    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    
    const handleImageChange = (e) => {
        e.preventDefault();
        const image = e.target.files[0];
        setProfilePictureURL(image);
    }

    const uploadImage = () => {
        if (!profilePictureURL) return;
        const imageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        uploadBytes(imageRef, profilePictureURL).then(() => {
            getDownloadURL(imageRef).then((url) => {
                const userRef = doc(db, "users", currentUser.uid);
                updateDoc(userRef, {
                    profilePicture: url
                }).then(() => {
                    navigate("/home");
                });

            });
        })
        .catch((error) => {
            alert(error.message);
        });
    }


    const style = {
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexGrow: '1',
        background: '#B0E0E6',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const logoStyle = {
        width: '350px',
        height: '100px',
        position: 'absolute',
        marginTop: '10px',
        marginLeft: '10px'
    }

    return (
        <>
            <img style={logoStyle} src="./img/logoP1.png" alt="logo" onClick={()=> navigate("/home")} />
            <div className='chooseProfilePic' style={style}>
                <input type="file" onChange={(event) => {handleImageChange(event)}} />
                <button type="button" className="btn btn-secondary" onClick={uploadImage}>
                    Continuer
                </button>
                
            </div>
        </>
    );
};

export default ChooseProfilePic;