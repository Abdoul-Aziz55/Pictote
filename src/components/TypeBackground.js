import React from 'react';

const TypeBackground = ({handleBgChanges}) => {

    let backgrounds = [];
    for (let i = 1; i <7; i++){
        backgrounds.push(`./background/bg${i}.png`);
    }

    

    return (
        <div id="typeBackground" className="d-flex flex-row">
            {backgrounds.map(background => (
                <img className="background" src={background} alt="background" key={background} onClick={()=>{;
                    handleBgChanges(background)
                }}/>
            ))}
        </div>
    );
};
export default TypeBackground 