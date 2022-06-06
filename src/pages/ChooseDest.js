import React, {useState, useEffect, useContext} from 'react';
import {db} from '../Firebase/firebase-config';
import { doc, updateDoc, collection, getDocs, arrayUnion } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Firebase/Auth';
import { Routes, Route, BrowserRouter } from "react-router-dom";


const ChooseDest = ({ message, setMessage, setDest }) => {
    const navigate = useNavigate();
    const [destList, setDestList] = useState({});
    const {currentUser} = useContext(AuthContext);
    const userRef = doc(db, "users", currentUser.uid);
    

    const style = {
        display: 'flex',
        flexDirection: 'column',
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

    const usersListStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '300px',
        height: '300px',
        overflowY: 'scroll',
    }

    const userStyle = {
        
        width: '80px',
        height: '80px',
        marginLeft: '10px',
        marginTop: '10px',
        border: '5px solid #B22222',
        borderRadius: '50%',
    }


    useEffect(() => {

        if (!currentUser) {
            navigate("/login");
        }
        const getUsers = () => {
            const usersListRef = collection(db, "users");
            getDocs(usersListRef).then((docs) => {
                docs.forEach((doc) => {
                    if (doc.id !== currentUser.uid) {
                        setDestList( prevState => ({
                            ...prevState,
                            [doc.id]: doc.data().profilePicture
                        }));
                    }
                });
            });
        }
        getUsers();
            
    }, []);

    
    const handleClick = (destUid) => {
        setDest(destUid);
        if (message){
        const destRef = doc(db, "conversations", destUid);
        const senderRef = doc(db, "conversations", currentUser.uid);

        const theNewmessage = {
            sender: currentUser.uid,
            message: message,
            date: new Date().toLocaleString(),
        }
        
        updateDoc(destRef, currentUser.uid, arrayUnion(theNewmessage))
            .then(() => {
                updateDoc(senderRef, destUid, arrayUnion(theNewmessage))
                .then(() => {
                    updateDoc(userRef, "contacts", arrayUnion(destUid)).then(() => {
                        setMessage(null);
                        setDest(null);
                        navigate('/home');
                    })
                
                })
            })
        }
        
    }
    
    

    return (
        <>

            <img style={logoStyle} src="./img/logoP1.png" alt="logo" />
            <div className='chooseDest' style={style}>
                <p>Choisissez votre destinataire</p>
                <div className='destList' style={usersListStyle}>
                    {Object.keys(destList).map((user) => {
                        
                        return (
                            <img style={userStyle} key={user} src={destList[user]} alt="profilePicture" 
                            onClick={() => {handleClick(user)}}/>
                            
                        );
                    }
                    )}
                </div>
            </div>

        </>
    );
};

export default ChooseDest;