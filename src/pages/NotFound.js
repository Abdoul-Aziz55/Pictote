import React from 'react';

const NotFound = () => {
    const style = {
        backgroundColor: '#B0E0E6',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    }
    return (
        <div style={style}>
            <h1>Erreur 404</h1>
        </div>
    );
};

export default NotFound;