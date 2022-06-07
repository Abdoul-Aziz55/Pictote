import React, {useState} from 'react';
import ChatContainer from "./ChatContainer";
import TypeAndSendMessages from "./TypeAndSendMessages";
import { useNavigate } from 'react-router';


const MessagerieScreen = ({showMessageForm, setShowMessageForm, message, setMessage}) => {
    /**
     * ce composant  est le conteneur du chat, du clavier et de certains boutons de controle qui permettent denvoyer le message
     * et de retourner aux conversations. Le button d envoi est invisible si le message est vide(si le background est vide)
     */
    const navigate = useNavigate();
    const [newBg, setNewBg] = useState("");
    

    const returnButtonStyle = {
        position: 'absolute',
        marginLeft: '10px',
        marginTop: '10px',
        width: '60px',
        height: '60px',
        background: 'url(./img/return.jpeg) center/cover',
        borderRadius: '10px',

    };

    const sendButtonStyle = {
        position: 'absolute',
        marginLeft: '10px',
        marginTop: '300px',
        width: '60px',
        height: '60px',
        background: 'url(./img/send.png) center/cover',
        borderRadius: '10px',
    };

    /**
     *  permet juste de mettre a jour le background de la conversation. Si on appuie deux fois sur le meme background,
     * le background est remis a vide
     * @param theNewBg le nouveau background de la conversation
     */
    const bgChanges = (theNewBg) =>{
        setMessage({...message, background: theNewBg});
        theNewBg === newBg ? setNewBg("") : setNewBg(theNewBg);
    }


    return (
        <div id="interactive-container" className="d-flex flex-column">
                <button style={returnButtonStyle} type="button" onClick={()=> setShowMessageForm(!showMessageForm)}/>
                {newBg && <button style={sendButtonStyle} type="button"
                onClick={()=> navigate("/chooseDest")}/>}
                
                <ChatContainer messageBg={newBg} message={message} setMessage={setMessage} />
                <TypeAndSendMessages bgChanges={bgChanges}/>
        </div>
    );
};

export default MessagerieScreen;