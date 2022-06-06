import { React, useState } from 'react';
import TypeMessage from "./TypeMessage";
import TypeBackground from "./TypeBackground";

const TypeAndSendMessages = ({ bgChanges }) => {

    const [active, setActive] = useState("background");
    

    return (
        <div className="keyboard">
            <nav>
                <button onClick={()=> setActive("background")}>Background</button>
                <button onClick={()=> setActive("pictogrammes")}>Pictogrammes</button>
            </nav>
            {active === "background" && <TypeBackground bgChanges={ bgChanges }/> }
            {active === "pictogrammes" && <TypeMessage/> }
        </div>
    );
};

export default TypeAndSendMessages;