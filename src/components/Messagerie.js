import React, {useState}from 'react';
import Profile from "./Profile"
import MessagerieScreen from "./MessagerieScreen"
import Conversations from "./Conversations"


const Messagerie = ({ message, setMessage }) => {
    /**
     * ce composant est le conteneur du profil et affiche les conversations si le showMessageForm est a false
     * et affiche le formulaire de message si le showMessageForm est a true
     */
    const [showMessageForm, setShowMessageForm] = useState(false);
    
    return (
        <div id="messagerie" className="d-flex flex-row">
            <Profile />
            {showMessageForm ?
                <MessagerieScreen showMessageForm={showMessageForm} setShowMessageForm={setShowMessageForm} message={message} setMessage={setMessage}/> 
            : 
                <Conversations showMessageForm={showMessageForm} setShowMessageForm={setShowMessageForm} />}
        </div>
    );
};

export default Messagerie;