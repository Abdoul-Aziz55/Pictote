
import {React, useState} from 'react';
import Picto from './Picto';

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
            <div className="d-flex flex-row">
                <nav>
                    <button onClick={()=> setActive("1")}>Nourriture</button>
                    <button onClick={()=> setActive("2")}>École</button>
                    <button onClick={()=> setActive("3")}>Maison</button>
                    <button onClick={()=> setActive("4")}>Émotions</button>
                    <button onClick={()=> setActive("5")}>Flore</button>
                    <button onClick={()=> setActive("6")}>Faune</button>
                    <button onClick={()=> setActive("7")}>Actions</button>
                    <button onClick={()=> setActive("8")}>Famille</button>
                    <button onClick={()=> setActive("9")}>Transport</button>
                    <button onClick={()=> setActive("10")}>Météo</button>
                    <button onClick={()=> setActive("11")}>Perso</button>
                    <button onClick={()=> setActive("12")}>Habits</button>
                    <button onClick={()=> setActive("13")}>Time</button>
                </nav>

                
            </div>
            
        </>

    );
};

export default TypeMessage;