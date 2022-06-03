import React, { useContext } from 'react';
import { Nav, NavBtn, NavBtnLink } from '../components/NavbarElements';
import { useNavigate, Navigate} from 'react-router';  
import { AuthContext } from '../Firebase/Auth';


const StartingPage = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    
    if (currentUser) {
        return <Navigate to="/home"/>
    }

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
                <h1>Bienvenue sur Pictote :)</h1>
                <h4>Veuillez vous connecter ou vous inscrire pour accéder à l'application</h4>  
                <Nav>
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