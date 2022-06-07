import React, { useState, useEffect, useContext } from 'react';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { db, storage } from '../Firebase/firebase-config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import { useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/Auth';
import ContactList from "./ContactList";


const Profile = () => {
    /***
     * ce composant affiche le profil de l utilisateur avec ses differents elements
     */
    const navigate = useNavigate();
    const [profilePictureURL, setProfilePictureURL]= useState(null);
    const { currentUser } = useContext(AuthContext);
    const [refToUpload, setRefToUpload] = useState(null);
    const userRef = doc(db, "users", currentUser.uid);


    /***
     * handleSignOut permet de se deconnecter de l application
     */
    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            alert(error.message);
        });
    }
    /***
     * Fonction qui permet de faire les requetes a la base de donnees pour changer la photo de profil
     * de l utilisateur
     */
    const handleImageChange = (e) => {
        e.preventDefault();
        const image = e.target.files[0];
        const imageRef = ref(storage, `profilePictures/${currentUser.uid}`);
        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                const userRef = doc(db, "users", currentUser.uid);
                updateDoc(userRef, {
                    profilePicture: url
                }).then(() => {
                    setProfilePictureURL(url);
                });

            });
        })
        .catch((error) => {
            alert(error.message);
        });
    }
    /***
     * on recupere la photo de profil de l utilisateur la premiere fois que le composant est monte sur le dom
     */
    useEffect(() => {
        const getProfilePicture = () => {
            
            getDoc(userRef).then((doc) => {
                setProfilePictureURL(doc.data().profilePicture);
            });
        }
        getProfilePicture();
    }, []);

    
    // ci dessous les variables de styles pour les differents elements associes au composant Profile
    const profileStyle = {
        width: '250px',
        height: '100vh',
        background:'#B0E0E6',
        alignItems: 'center',
        minWidth: '250px',
        minHeight: '775px',
    }
    const logoPictoteStyle = {
        padding: '20px',
        width: '95%',
    }
    const editButtonStyle = {
        padding: '30px',
        marginTop:'10px',
        borderRadius: '10px',
        background: 'url(./img/editProfile.jpeg) center/cover',
        backgroundColor: 'white',
    }
    const logOutButtonStyle = {
        padding: '30px',
        marginTop:'10px',
        marginLeft: '30px',
        borderRadius: '50%',
        background: 'url(./img/logOut.png) center/cover',
        backgroundColor: 'white',
    }

    const divButtonStyle = {
        display: 'flex',
        flexDirection: 'row',
    }

    const profilePictureStyle = {
        height: '200px',
        width: '200px',
        border: '5px solid',
        borderRadius: '20px',
    }


    return (
        <div style={profileStyle} className="d-flex flex-column">
            <img style={logoPictoteStyle} src="./img/logoP1.png" alt="logoP1" />
            <img style={profilePictureStyle} src={profilePictureURL} alt="profilePicture" />
            <input style={{display: 'none'}} 
            type="file" 
            onChange={(event) => {handleImageChange(event)}} 
            ref={fileInput => setRefToUpload(fileInput)} 
            />
            <div style={divButtonStyle}>
                <button style={editButtonStyle} type='button' className='btn btn-secondary'
                onClick={() => refToUpload.click()}/>
                <button style={logOutButtonStyle} type="button" className="btn btn-secondary"
                onClick={handleSignOut}/>
                
            </div>
            <ContactList/>
        </div>
    );
};

export default Profile;