import React from 'react';
import LogoP1 from "./LogoP1";
import ProfilePicture from "./ProfilePicture";
import ContactList from "./ContactList";
import {signOut } from "firebase/auth";
import {auth} from "../Firebase/firebase-config";
import { useNavigate } from 'react-router';



const Profile = ({logOut, userUid}) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            logOut();
            navigate("/");
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    const handleEditProfilePicture = () => {
        navigate("/chooseProfilePic");
    }

    const editButtonStyle = {
        padding: '30px',
        marginTop:'10px',
        borderRadius: '50%',
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

    return (
        <div id = "profile" className="d-flex flex-column">
            <LogoP1/>
            <ProfilePicture userUid={userUid}/>
            <div style={divButtonStyle}>
                <button style={editButtonStyle} type='button' className='btn btn-secondary'
                onClick={handleEditProfilePicture}/>
                <button style={logOutButtonStyle} type="button" className="btn btn-secondary"
                onClick={handleSignOut}/>
                
            </div>
            <ContactList/>
        </div>
    );
};

export default Profile;