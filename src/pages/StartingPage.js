import React from 'react';
import {
    Nav,
    Bars,
    NavBtn,
    NavBtnLink,
  } from '../components/NavbarElements';
import { useNavigate } from 'react-router';  

const StartingPage = () => {
    const navigate = useNavigate();
    const style = {
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexGrow: '1',
        flexDirection: 'column',
        background: '#B0E0E6',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const logoStyle = {
        width: '350px',
        height: '100px',
        position: 'absolute',
        marginTop: '10px',
        marginLeft: '10px'
    }



    return (
        <>
            
            <img style={logoStyle} src="./img/logoP1.png" alt="logo" onClick={()=> navigate("/")} />
            <div style={style}>
                <h1>Bienvenue sur Pictote ^^</h1>  
                <Nav>
                    <Bars />
                    <NavBtn>
                        <NavBtnLink to='/signup'>Créer un compte</NavBtnLink>
                        <NavBtnLink to='/login'>Connexion</NavBtnLink>
                    </NavBtn>
                </Nav>
            
            </div>
        </>
    );
};

export default StartingPage;