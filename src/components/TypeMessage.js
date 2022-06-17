import {React, useState} from 'react';
import Picto from './Picto';
import {Howl} from 'howler';


const TypeMessage = () => {

    let pictos = [];
    for (let i = 0; i <14; i++){
        pictos.push([]);
    }

    for (let i = 1; i <21; i++){
        pictos[0].push(`./pictogrammes/1 - nourriture/1${i}.png`);
    }
    for (let i = 1; i <11; i++){
        pictos[1].push(`./pictogrammes/2 - ecole/2${i}.png`);
    }
    for (let i = 1; i <16; i++){
        pictos[2].push(`./pictogrammes/3 - maison/3${i}.png`);
    }
    for (let i = 1; i <8; i++){
        pictos[3].push(`./pictogrammes/4 - émotions/4${i}.png`);
    }

    
    pictos[4].push(`./pictogrammes/5 - faune et flore/51 - flore/511.png`);

    for (let i = 1; i <18; i++){
        pictos[5].push(`./pictogrammes/5 - faune et flore/52 - faune/52${i}.png`);
    }

    for (let i = 1; i <25; i++){
        pictos[6].push(`./pictogrammes/6 - actions/6${i}.png`);
    }

    for (let i = 1; i <9; i++){
        pictos[7].push(`./pictogrammes/7 - famille/7${i}.png`);
    }

    for (let i = 1; i <8; i++){
        pictos[8].push(`./pictogrammes/8 - transport/8${i}.png`);
    }

    for (let i = 1; i <7; i++){
        pictos[9].push(`./pictogrammes/9 - météo/9${i}.png`);
    }

    for (let i = 1; i <6; i++){
        pictos[10].push(`./pictogrammes/10 - perso/10${i}.png`);
    }

    for (let i = 1; i <5; i++){
        pictos[11].push(`./pictogrammes/11 - habits/11${i}.png`);
    }

    for (let i = 1; i <8; i++){
        pictos[12].push(`./pictogrammes/time/T${i}.png`);
    }
   
    const [active, setActive] = useState("1");
    
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

        <>
            <div id="typeMessage" className="d-flex flex-row">
                {active === "1" && pictos[0].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "2" && pictos[1].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "3" && pictos[2].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "4" && pictos[3].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "5" && pictos[4].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "6" && pictos[5].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "7" && pictos[6].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "8" && pictos[7].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "9" && pictos[8].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "10" && pictos[9].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "11" && pictos[10].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "12" && pictos[11].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}
                {active === "13" && pictos[12].map((picto) => {
                    return (<Picto key={picto} id={picto} picto={picto} isCopy={false}/>);
                })}

            </div>
            <div style={{height:'60px', overflowY: 'scroll'}} className="d-flex flex-row">
                <nav>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/nourriture_transparent.png' alt='nourriture' 
                        onClick={()=> {
                        soundPlay('./audio/nourriture.wav');
                        setActive("1")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/ecole_transparent.png' alt='nourriture'  
                        onClick={()=> {
                            soundPlay('./audio/ecole.wav');
                            setActive("2")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/maison_transparent.png' alt='maison'  
                        onClick={()=> {

                            setActive("3")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/emotions_transparent.png' alt='emotions' 
                        onClick={()=> {
                            soundPlay('./audio/emotion.wav');
                            setActive("4")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/vegetaux_transparent.png' alt='vegetaux'  
                        onClick={()=> {
                            soundPlay('./audio/vegetaux.wav');
                            setActive("5")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/animaux_transparent.png' alt='animaux'  
                        onClick={()=> {
                            soundPlay('./audio/animaux.wav');
                            setActive("6")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                    src='./categories/action_transparent.png' alt='action'  
                    onClick={()=> {
                        soundPlay('./audio/action.wav');
                        setActive("7")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/famille_transparent.png' alt='famille'  
                        onClick={()=> {
                            soundPlay('./audio/famille.wav');
                            setActive("8")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/transport_transparent.png' alt='transport'  
                        onClick={()=> {
                            soundPlay('./audio/transport.wav');
                            setActive("9")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/meteo_transparent.png' alt='meteo'  
                        onClick={()=> {
                            soundPlay('./audio/meteo.wav');
                            setActive("10")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/personnes_transparent.png' alt='personnes'  
                        onClick={()=> {
                            soundPlay('./audio/personnes.wav');
                            setActive("11")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/vetement_transparent.png' alt='vetement'  
                        onClick={()=> {
                            soundPlay('./audio/vetement.wav');
                            setActive("12")}}/>
                    <img style={{marginLeft:'10px',marginRight:'10px', height: '60px', border:'5px solid #B22222', borderRadius:'5px', backgroundColor:'white'}} 
                        src='./categories/temps_transparent.png' alt='temps'  
                        onClick={()=> {

                            setActive("13")}}/>
                </nav>

                
            </div>
            
        </>

    );
};

export default TypeMessage;