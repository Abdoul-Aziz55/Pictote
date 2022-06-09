import { React, useState } from 'react';
import TypeMessage from "./TypeMessage";
import TypeBackground from "./TypeBackground";

const TypeAndSendMessages = ({ bgChanges }) => {
    /**
     * ce composant contient des boutons qui permettent de switcher entre le choix du background et celui des pictogrammes
     * il rend les differents claviers conditionnellement a la valeur de [active]
     */
    const [active, setActive] = useState("background");
    

    return (
        <div className="keyboard">
            <div>
                <button onClick={()=> setActive("background")}>Background</button>
                <button onClick={()=> setActive("pictogrammes")}>Pictogrammes</button>
            </div>
            {active === "background" && <TypeBackground bgChanges={ bgChanges }/> }
            {active === "pictogrammes" && <TypeMessage/> }
        </div>
    );
};

export default TypeAndSendMessages;