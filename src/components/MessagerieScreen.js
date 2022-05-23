import React, {useState} from 'react';
import ChatContainer from "./ChatContainer";
import TypeAndSendMessages from "./TypeAndSendMessages";
import { useNavigate } from 'react-router';
import update from 'immutability-helper';


const MessagerieScreen = ({showBool, HandleShowBool, messageChange}) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({});
    const [newBg, setNewBg] = useState("");
    const [newMessageBody, setNewMessageBody] = useState({});
    

    const returnButtonStyle = {
        position: 'absolute',
        marginLeft: '10px',
        marginTop: '10px',
        width: '60px',
        height: '60px',
        background: 'url(./img/return.jpeg) center/cover',
    };

    const sendButtonStyle = {
        position: 'absolute',
        marginLeft: '10px',
        marginTop: '300px',
        width: '60px',
        height: '60px',
        border: '2px solid #5682B4',
       
        background: 'url(./img/send.png) center/cover',
    };


    const bgChanges = (theNewBg) =>{
        setMessage({...message, background: theNewBg});
        theNewBg === newBg ? setNewBg("") : setNewBg(theNewBg);
    }

    const handleMessageBodyChange = (id, left, top) => {
        if(!newMessageBody.hasOwnProperty(id)){
            setNewMessageBody({...newMessageBody, [id]: {left, top}});
        }
        else{
            setNewMessageBody(update(newMessageBody, {
                [id]: {
                    $merge: { left, top },
                },
            }));
        }

        setMessage({...message, body: {...newMessageBody}});
    }



    const HandleForm = () => {
        HandleShowBool(!showBool);
    }

    const HandleSend = () => {
        messageChange(message);
        navigate("/chooseDest");
    }

    


    return (
        <div id="interactive-container" className="d-flex flex-column">
                <button style={returnButtonStyle} type="button" onClick={HandleForm}/>
                {newBg && <button style={sendButtonStyle} type="button"
                onClick={HandleSend}/>}
                
                <ChatContainer messageBg={newBg} messageChange={handleMessageBodyChange}/>
                <TypeAndSendMessages bgChanges={bgChanges}/>
        </div>
    );
};

export default MessagerieScreen;