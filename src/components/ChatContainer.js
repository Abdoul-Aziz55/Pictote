import React from 'react';
import NewMessageForm from './NewMessageForm';

const ChatContainer = ({messageBg, message, setMessage}) => {
    /***
     * `Ce composant affiche le formulaire du message des qu on choisi un contexte(image de fond du message)
     */
    
    return (
        <div className="chatContainer" >
            {messageBg !== "" && <NewMessageForm messageBg={messageBg} message={message} setMessage={setMessage} /> }
        </div>
    );
};

export default ChatContainer;