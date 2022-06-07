import React from 'react';
import { useDrag } from 'react-dnd';

const Picto = ({ id, picto, left, top, isCopy }) => {
    /**
     * composant qui represente un pictogramme.
     * il est possible de le saisir et le deplacer sur la page grace a useDrag pour le deposer 
     * dans un endroit ou il est possible de le deposer
     * La propriete isCopy permet de savoir si le pictogramme est copie ou non pour pouvoir differencier un pictogramme
     * affiche sur le clavier et un pictogramme qui fait partie d un message.
     */
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
    
    /***
     * useDrag permet de recuperer les donnees du composant pour le deplacer
     * voir la documentation pour plus de details
     */
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