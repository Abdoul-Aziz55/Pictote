import React, { useState, useEffect, useContext } from 'react';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { db, storage } from '../Firebase/firebase-config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import { useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/Auth';
import LogoP1 from "./LogoP1";
import ContactList from "./ContactList";


const Profile = () => {
    const navigate = useNavigate();
    const [profilePictureURL, setProfilePictureURL]= useState(null);
    const { currentUser } = useContext(AuthContext);
    const [refToUpload, setRefToUpload] = useState(null);
    const userRef = doc(db, "users", currentUser.uid);



    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigate("/");
        })
        .catch((error) => {
            alert(error.message);
        });
    }

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

    useEffect(() => {
        const getProfilePicture = () => {
            
            getDoc(userRef).then((doc) => {
                setProfilePictureURL(doc.data().profilePicture);
            });
        }
        getProfilePicture();
    }, []);

    

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

    const profileStyle = {
        width: '250px',
        background:'#B0E0E6',
        alignItems: 'center',
        minWidth: '250px',
        minHeight: '500px',
    }

    return (
        <div style={profileStyle} className="d-flex flex-column">
            <LogoP1/>
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