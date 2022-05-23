import React from 'react';
import { useDrag } from 'react-dnd';

const Picto = ({ id, picto, left, top, isCopy }) => {
    var style = {
        height:'60px',
        width:'60px',
        margin: '15px',
        border: '2px solid',
        padding: '5px',
        background: '$color-3',
        cursor: 'move',
        zIndex: '1',
        position: 'absolute',
    };
    
    const [, drag] = useDrag(() => ({
        type: 'picto',
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, left, top]);

    
    if (isCopy){
        return (
            <img ref={drag} className="picto" style = {{...style, left, top}} src={picto} alt={picto} key={picto}/>
        );
    }
    return (
        
        <img ref={drag} className ="picto" src={picto} alt={picto} key={picto}/>
    );
};

export default Picto;