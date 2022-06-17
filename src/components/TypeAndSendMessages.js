import { React, useState } from 'react';
import TypeMessage from "./TypeMessage";
import TypeBackground from "./TypeBackground";
import {Howl} from 'howler';

const TypeAndSendMessages = ({ bgChanges }) => {

    const [active, setActive] = useState("background");
    

    const soundPlay = (src) => {
        const sound = new Howl({
            src: [src],
            volume: 1.0,
            loop: false,
            autoplay: true,
        });
        sound.play();   // play the sound
    }
    return (
        <div className="keyboard">
            <nav style={{height:'60px'}}>
                <img style={{marginLeft:'30px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}}  src='./categories/fond_transparent.png' alt='fond' onClick={()=> {
                    soundPlay('./audio/fond.wav');
                    setActive("background")}}/>
                <img style={{marginLeft:'50px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}}  src='./categories/pictogramme_transparent.png' alt='fond' onClick={()=> {
                    soundPlay('./audio/pictogramme.wav');
                    setActive("pictogrammes")}}/>
            </nav>
            {active === "background" && <TypeBackground bgChanges={ bgChanges }/> }
            {active === "pictogrammes" && <TypeMessage/> }
        </div>
    );
};

export default TypeAndSendMessages;