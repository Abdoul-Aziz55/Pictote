import React from 'react';

const NotFound = () => {
    /**
     * page 404 qui s affiche si l utilisateur essaie d acceder a une page qui n existe pas
     */
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