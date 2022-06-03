import {React, useState, useCallback} from 'react';
import {useDrop} from 'react-dnd';
import update from 'immutability-helper';
import Picto from './Picto';


const NewMessageForm = ({messageBg, message, setMessage}) => {
    
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
            const rect = document.getElementById("messageBg").getBoundingClientRect();
                var containerPos = {
                    top: rect.top + window.pageYOffset,
                    left: rect.left + window.pageXOffset
                }
            
            if(!thePictos.hasOwnProperty(item.id) || (!item.left && !item.top) ){
                    
                let left = monitor.getClientOffset().x - containerPos.left;
                let top = monitor.getClientOffset().y - containerPos.top;
                
                if (top < 0) {
                    top = 0;
                }
                if (left < 0) {
                    left = 0;
                }

                moveThePictos(item.id, left + containerPos.left, top + containerPos.top);
                setMessage(prevState => {
                    if (prevState.body){
                        return {...prevState, body: {...prevState.body, [item.id]: {left: left, top: top}}};   
                    }
                    return {...prevState, body: {[item.id]:{left: left, top: top}}}
                });
            } else {
                const delta = monitor.getDifferenceFromInitialOffset();
                
                let left = Math.round(item.left + delta.x)  - containerPos.left;
                let top = Math.round(item.top + delta.y) - containerPos.top;
                
                if (top < 0) {
                    top = 0;
                }
                if (left < 0) {
                    left = 0;
                }
    
                moveThePictos(item.id, left + containerPos.left, top + containerPos.top);
                setMessage(prevState => ({...prevState, body: {...prevState.body, [item.id]: {left: left, top: top}}}));
                
                
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