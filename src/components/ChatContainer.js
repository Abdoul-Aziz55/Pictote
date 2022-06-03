import React from 'react';
import NewMessageForm from './NewMessageForm';

const ChatContainer = ({messageBg, message, setMessage}) => {
    
    return (
        <div className="chatContainer" >
            {messageBg !== "" && <NewMessageForm messageBg={messageBg} message={message} setMessage={setMessage} /> }
        </div>
    );
};

export default ChatContainer;