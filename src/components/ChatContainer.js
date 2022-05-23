import React from 'react';
import NewMessageForm from './NewMessageForm';

const ChatContainer = ({messageBg, messageChange}) => {

    const handleMessageChange = (id, left, top) => {
        messageChange(id, left, top);
    }
    
    
    return (
        <div className="chatContainer" >
            {messageBg !== "" && <NewMessageForm messageBg={messageBg} messageChange={handleMessageChange}/> }
        </div>
    );
};

export default ChatContainer;