import React from 'react';
import { useEffect, useState, useContext} from 'react';
import { db } from '../Firebase/firebase-config';
import {doc, getDoc} from 'firebase/firestore';
import { AuthContext } from '../Firebase/Auth';
import MessageList from './MessageList';




const Conversations = ({showMessageForm, setShowMessageForm }) => {
    const [conversations, setConversations] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const [currentConvToShow, setCurrentConvToShow] = useState(null);
    const userRef = doc(db, "conversations", currentUser.uid);
    

    useEffect(() => {
        
        const getUsers = () => {
            getDoc(userRef)
            .then((document) => {
                Object.keys(document.data()).forEach((uid) => {
                    const convRef = doc(db, "users", uid);
                    getDoc(convRef)
                    .then((document1) => {
                        setConversations(prevConv => [...prevConv, {...document1.data(), id: uid}]);
                        
                    });
                });
            });
            
        };
        
        
        getUsers();
        
        
    }, []);
    
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: '1',
        marginLeft: '20px',
        minHeight: '100vh',
        width: '100%',
    }
    const convListStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        marginLeft: '10px',
        minWidth: '200px',
        minHeight: '100vh',
        background: '#B0E0E6',
        overflowY: 'scroll',

    }
    const convStyle = {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10px',
        width: '70%',
        minWidth: '700px',
        minHeight: '100vh',
        background: '#B0E0E6',
        overflowY: 'scroll',

    }

    const buttonStyle = {
        position: 'absolute',
        marginTop: '90vh',
        marginRight: '10px',
        width: '60px',
        height: '60px',
        background: 'url(./img/newMessage.png) center/cover',
        borderRadius: '10px',
        
    };
    
    const convCardStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        fontColor: 'black',
        height: '100px',
        cursor: 'pointer',
        border: '1px solid black',
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        background: '#5682B4',
        borderRadius: '30px',
        
    }

    const userImgStyle = {
        width: '80px',
        height: '80px',
        border: '5px solid #B22222',
        borderRadius: '50%',
    }

    const userNameStyle = {
       marginTop: '20px',
    }


    return (
        <div style={containerStyle}>
            <div style={convListStyle}>
                {conversations.map((conv) => {
                    return (
                        <div className='convDiv' style={convCardStyle} key={conv.id} onClick={() => {setCurrentConvToShow(conv.id)}}>
                            <img style={userImgStyle} src={conv.profilePicture} alt={conv.firstName}/>
                            <p style={userNameStyle}>{conv.firstName}</p>
                        </div>
                    );
                })}

            </div>

            <div style={convStyle}>
                {currentConvToShow && <MessageList convId={currentConvToShow}/>}
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end',}}>
                <button style={buttonStyle} type="button" onClick={()=> setShowMessageForm(!showMessageForm)}/>
            </div>
            
        </div>
    );
};

export default Conversations;
