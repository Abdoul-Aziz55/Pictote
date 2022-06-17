import React, {useContext, useEffect, useState} from 'react';
import {db} from '../Firebase/firebase-config';
import {doc, getDoc} from 'firebase/firestore';
import { AuthContext } from '../Firebase/Auth';


const ContactList = () => {
    /**
     * ce composant recupere les contacts de l utilisateur et les affiche
     */
    const [contacts, setContacts] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const userRef = doc(db, "users", currentUser.uid);

    useEffect(() => {
        const getContacts = () => {
            getDoc(userRef).then((document) => {
                document.data().contacts.forEach(contact => {
                    const contactRef = doc(db, "users", contact);
                    getDoc(contactRef).then((currentContact) => {
                        setContacts(contacts => [...contacts, {profilePicture: currentContact.data().profilePicture, name: currentContact.data().firstName, uid: currentContact.id}]);
                    })
                })
            });
        }
        getContacts();
    }, []); 

    const contactListStyle = {
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '200px',
        marginTop: '20px',
    }

    const contactStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
    }

    const contactImgStyle = {
        width: '60px',
        height: '60px',
        border: '5px solid #B22222',
        borderRadius: '50%',
    }

    


    return (
        <div style={contactListStyle} className="flex-grow-1">
            {contacts.map(contact => (
                <div style={contactStyle} key={contact.uid}>
                    <img style={contactImgStyle} src={contact.profilePicture} alt={contact.name}/>
                    <p style={{marginTop: '20px'}}>{contact.name}</p>
                </div>
            ))}
        </div>
        
    );
};

export default ContactList;