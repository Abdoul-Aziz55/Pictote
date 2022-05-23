import React from 'react';


const Welcome = ({showBool, HandleShowBool}) => {
    const style = {
        background: '#B0E0E6',
        flexGrow: 1,
        marginLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontColor: 'white',
    };

    const buttonStyle = {
        position: 'absolute',
        bottom: 0,
        right: "40px",
        width: '60px',
        height: '60px',
        background: 'url(./img/newMessage.png) center/cover',
    };

    function HandleForm(){
        HandleShowBool(!showBool);
    }
    return (
        <div style={style}>
            <h1>Bienvenue sur votre messagerie</h1>
            <button style={buttonStyle} type="button" onClick={HandleForm}/>
        </div>
    );
};

export default Welcome;