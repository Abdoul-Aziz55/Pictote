import React, {useState}from 'react';
import Profile from "./Profile"
import MessagerieScreen from "./MessagerieScreen"
import Conversations from "./Conversations"


const Messagerie = ({ message, setMessage }) => {
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