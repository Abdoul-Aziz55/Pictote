import React, {useState}from 'react';
import Profile from "./Profile"
import MessagerieScreen from "./MessagerieScreen"
import Welcome from "./Welcome"


const Messagerie = ({logOut, userUid, messageChange}) => {
    const [showMessageForm, setShowMessageForm] = useState(false);
    

    const HandleShowForm = (bool) => {
        setShowMessageForm(bool);
    }

    const handleMessageChange = (message) => {
        messageChange(message);
    }

    
    return (
        <div id="messagerie" className="d-flex flex-row">
            <Profile logOut={logOut} userUid={userUid} />
            {showMessageForm ?
             <MessagerieScreen showBool={showMessageForm} HandleShowBool={HandleShowForm} messageChange={handleMessageChange}/> 
            : 
            <Welcome showBool={showMessageForm} HandleShowBool={HandleShowForm}/>}
        </div>
    );
};

export default Messagerie;