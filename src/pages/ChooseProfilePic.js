import React, {useState} from 'react';
import { db, storage } from '../Firebase/firebase-config';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';

const ChooseProfilePic = ({userUid}) => {
    const navigate = useNavigate();

    const [profilePicture, setProfilePicture]= useState(null);
    
    const handleImageChange = (e) => {
        e.preventDefault();
        const image = e.target.files[0];
        setProfilePicture(image);
    }

    const uploadImage = () => {
        if (profilePicture === "null") return;
        const imageRef = ref(storage, `profilePictures/${userUid}`);
        uploadBytes(imageRef, profilePicture).then(() => {
            getDownloadURL(imageRef).then((url) => {
                const userRef = doc(db, "users", userUid);
                updateDoc(userRef, {
                    profilePicture: url
                });
            });
            navigate("/home");
        }
        )
        .catch((error) => {
            alert(error.message);
        }
        );
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
            <img style={logoStyle} src="./img/logoP1.png" alt="logo" />
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