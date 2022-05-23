import {React, useState, useCallback} from 'react';
import {useDrop} from 'react-dnd';
import update from 'immutability-helper';
import Picto from './Picto';


const NewMessageForm = ({messageBg, messageChange}) => {
    
    const [thePictos, setThePictos] = useState({});

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
         
        

    const [, drop] = useDrop(() => ({
        accept: 'picto',
        drop: (item, monitor) => {
            

            if(!thePictos.hasOwnProperty(item.id) || (!item.left && !item.top) ){
                    
                var left = monitor.getClientOffset().x 
                var top = monitor.getClientOffset().y;

                moveThePictos(item.id, left, top);
                handleMessageChange(item.id, left, top);
            } else {
                const delta = monitor.getDifferenceFromInitialOffset();
                const left = Math.round(item.left + delta.x);
                const top = Math.round(item.top + delta.y);
    
                moveThePictos(item.id, left, top);
                handleMessageChange(item.id, left, top);

            }
            
            return undefined;
        },
    }), [moveThePictos]);


    const handleMessageChange = (id, left, top) => {
        
        messageChange(id, left, top);
    }
    

    

    
    return (
        <div className="newMessage" id="newMessage" ref={drop}>
            <img className="messageBg" src={messageBg} alt="New Message"/>
            {Object.keys(thePictos).map((key) => {
                const {left, top} = thePictos[key];
                
                return (<Picto key={key} id={key} picto={key} left={left} top={top} isCopy={true}/>);
            })}
        </div>
    );
};

export default NewMessageForm;