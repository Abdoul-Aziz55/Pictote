import { React, useState } from 'react';
//import SendMessage from "./SendMessage";
import TypeMessage from "./TypeMessage";
import TypeBackground from "./TypeBackground";

const TypeAndSendMessages = ({bgChanges}) => {

    const [active, setActive] = useState("background");


    // const handleMessage = (picto) => {
    //     setMessage( arr => [...arr, picto]);
    //     //console.log(message);
    // }
    const handleBgChanges = (newBg) =>{
        bgChanges(newBg);
    }
    
    

    return (
        <div className="keyboard">
            {/* <SendMessage message={message}/> */}
            <nav>
                <button onClick={()=> setActive("background")}>Background</button>
                <button onClick={()=> setActive("pictogrammes")}>Pictogrammes</button>
            </nav>
            {active === "background" && <TypeBackground handleBgChanges={handleBgChanges}/> }
            {active === "pictogrammes" && <TypeMessage/> }
        </div>
    );
};

export default TypeAndSendMessages;