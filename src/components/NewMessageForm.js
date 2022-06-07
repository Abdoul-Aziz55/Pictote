import {React, useState, useCallback} from 'react';
import {useDrop} from 'react-dnd';
import update from 'immutability-helper';
import Picto from './Picto';


const NewMessageForm = ({messageBg, setMessage}) => {
    /**
     * ce composant contient le corps du message constitue du background et des pictogrammes
     * il permet de receptionner les pictogrammes glisses et depose dans le background en recuperant
     * leurs positions sur le background. 
     */
    const [thePictos, setThePictos] = useState({});

    /**
     * fonction qui permet de deplacer les pictogrammes en mettant a jour leur position sur le background
     */
    const moveThePictos = useCallback((id, left, top) => {
                
        if (!thePictos.hasOwnProperty(id)) {             
            setThePictos(prevState => ({...prevState, [id]: {left: left, top: top}}));
        } else {
            
            setThePictos(update(thePictos, {
                [id]: {
                    $merge: { left, top },
                },
            }));
        }}, [thePictos, setThePictos])
         
        
    /**
     * hook de react-dnd (dnd: drag and drop) qui permet de receptionner des fichiers. voir la doc pour plus de precision.
     */
    const [, drop] = useDrop(() => ({
        accept: 'picto',
        drop: (item, monitor) => {
            const rect = document.getElementById("messageBg").getBoundingClientRect();
            var containerPos = {
                top: rect.top + window.pageYOffset,
                left: rect.left + window.pageXOffset
            }
            
            if(!thePictos.hasOwnProperty(item.id) || (!item.left && !item.top) ){ // si le picto n'est pas dans le background on laffiche juste a la position de depot
                    
                let left = monitor.getClientOffset().x - containerPos.left; // marge horizontale du picto sur le background
                let top = monitor.getClientOffset().y - containerPos.top; // marge verticale du picto sur le background
                
                // on verifie que le picto ne sort pas du background
                if (top < 0) {
                    top = 0;
                }
                if (left < 0) {
                    left = 0;
                }

                moveThePictos(item.id, left + containerPos.left, top + containerPos.top); // on met a jour la position du picto
                setMessage(prevState => {
                    if (prevState.body){
                        return {...prevState, body: {...prevState.body, [item.id]: {left: left, top: top}}};   
                    }
                    return {...prevState, body: {[item.id]:{left: left, top: top}}}
                }); // mise a jour du message
            } else { // si le picto est deja dans le message on remplace l ancien picto par le nouveau pictogramme depose a la nouvelle position
                const delta = monitor.getDifferenceFromInitialOffset(); // voir la doc. c est en gros la position du pictogramme sur la page
                
                let left = Math.round(item.left + delta.x)  - containerPos.left; // marge horizontale du picto sur le background
                let top = Math.round(item.top + delta.y) - containerPos.top; // marge verticale du picto sur le background
                // on verifie que le picto ne sort pas du background
                if (top < 0) {
                    top = 0;
                }
                if (left < 0) {
                    left = 0;
                }
    
                moveThePictos(item.id, left + containerPos.left, top + containerPos.top); // on met a jour la position du picto
                setMessage(prevState => ({...prevState, body: {...prevState.body, [item.id]: {left: left, top: top}}})); // mise a jour du message
                
                
            }

            return undefined;
        },
    }), [moveThePictos]);

    

    

    
    return (
        <div className="newMessage" id="newMessage" >
            <img className="messageBg" style={{backgroundColor: 'white'}} id="messageBg" src={messageBg} alt="New Message" ref={drop}/>
            {Object.keys(thePictos).map((key) => {
                const {left, top} = thePictos[key];
                
                return (<Picto key={key} id={key} picto={key} left={left} top={top} isCopy={true}/>);
            })}
        </div>
    );
};

export default NewMessageForm;