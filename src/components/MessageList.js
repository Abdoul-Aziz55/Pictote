import React, {useContext, useEffect, useState} from 'react';
import {db} from '../Firebase/firebase-config';
import {doc, getDoc } from 'firebase/firestore';
import {AuthContext} from '../Firebase/Auth';

const MessageList = ({convId}) => {
    const [messages, setMessages] = useState([]);
    const [userProfilPic, setUserProfilPic] = useState(null);
    const [otherUserProfilPic, setOtherUserProfilPic] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const userRef = doc(db, "conversations", currentUser.uid);

    useEffect(() => {
        const getMessages = () => {
            getDoc(userRef).then(doc => {
                if (doc.data()[convId]){
                    setMessages(doc.data()[convId]);
                }
            })
            .catch(err => {
                alert(err);
            })

            const userInfoRef = doc(db, "users", currentUser.uid);
            const otherUserInfoRef = doc(db, "users", convId);
            getDoc(userInfoRef).then(doc => {
                setUserProfilPic(doc.data().profilePicture);

                getDoc(otherUserInfoRef).then(doc => {
                    setOtherUserProfilPic(doc.data().profilePicture);
                })
                .catch(err => {
                    alert(err);
                })

            }
            ).catch(err => {
                alert(err);
            })
            
                


        }
        getMessages();
    }, []);

    const messageContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        height: '500px',
    }

    let pictoStyle = {
        height:'60px',
        width:'60px',
        margin: '15px',
        border: '2px solid',
        padding: '5px',
        background: '#B0E0E6',
        position: 'absolute',
    };

    const bgStyle = {
        width: '400px',
        height: '400px',
        backgroundColor: 'white',
    };
    

    const profileImgStyle = {
        width: '60px',
        height: '60px',
        border: '5px solid #B22222',
        borderRadius: '50%',
    }


    const footerStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: '400px',
        height: '100px',
        justifyContent: 'space-between',
        alignItems: 'center',

        
    }



    return (
        <>
            {messages.map((message) => {
                if (message.sender === currentUser.uid){
                    return (
                        <div style={{...messageContainerStyle}} key={message.date}>
                            <div style={{...bgStyle, marginLeft: '20vw', marginTop: '10px', position: 'relative'}}>
                                <img src={message.message.background} style={bgStyle} alt={message.date}/>
                                {message.message.body && Object.keys(message.message.body).map((pictoId) => {
                                   
                                    const left = message.message.body[pictoId].left;
                                    const top = message.message.body[pictoId].top;
                                    return (
                                        <img style={{...pictoStyle, left, top}} src={pictoId} alt={pictoId} key={pictoId}/>
                                    )
                                })}
                            </div>
                            <div style={{...footerStyle, marginLeft: "20vw"}}>
                                <p>{message.date}</p>
                                <img src={userProfilPic} style={profileImgStyle} alt={message.date}/>
                            </div>
                        </div>
                    )
                }
                return (
                    <div style={{...messageContainerStyle}} key={message.date}>
                            <div style={{...bgStyle, marginLeft: '5vw', marginTop: '10px', position: 'relative'}}>
                                <img src={message.message.background} style={bgStyle} alt={message.date}/>
                                {message.message.body && Object.keys(message.message.body).map((pictoId) => {
                                    const left = message.message.body[pictoId].left;
                                    const top = message.message.body[pictoId].top;
                                    return (
                                        <img style={{...pictoStyle, left, top}} src={pictoId} alt={pictoId} key={pictoId}/>
                                    )
                                })}
                            </div>
                            <div style={{...footerStyle, marginLeft: "5vw"}}>
                                <img src={otherUserProfilPic} style={profileImgStyle} alt={message.date}/>
                                <p>{message.date}</p>
                            </div>
                        </div>
                    )
            })}
        </>
    );
};

export default MessageList;