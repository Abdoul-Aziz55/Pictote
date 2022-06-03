import React, {useState, useContext, useCallback} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {auth} from "../Firebase/firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { AuthContext } from '../Firebase/Auth';
import { Navigate, useNavigate} from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext);
        
    if (currentUser) {
        return <Navigate to="/home"/>
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(
                auth,
                email,
                password)
        
        .catch((error) => {
            if (error.code === "auth/user-not-found")
            {
                setError("Mail invalide.");
            }
            if (error.code === "auth/wrong-password")
            {
                setError("Mot de passe invalide.");
            }
            if (error.code === "auth/too-many-requests")
            {
                setError("Le compte lié à cet email a été désactivé temporairement suite à plusieurs tentatives de connexion.");
            }   
            
        });

    }

    
 
    const style = {
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexGrow: '1',
        background: '#B0E0E6',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    };

    const logoStyle = {
        width: '350px',
        height: '100px',
        position: 'absolute',
        marginTop: '10px',
        marginLeft: '10px'
    }

    const errorStyle = {
        color: 'red',
        fontSize: '15px',

    }
    

    return (
        <>
            <img style={logoStyle} src="./img/logoP1.png" alt="logo" onClick={()=> navigate("/")}/>
            <div style={style}>   
                <h1><b>Connexion</b></h1><br/>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <br/>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemple@gmail.com"
                    />
                    </Form.Group>
                    <br/>
                    <Form.Group size="lg" controlId="password">
                    <Form.Label>Mot de passe</Form.Label>
                    <br/>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>
                    <br/>
                    {error && <p style={errorStyle}>{error}</p>}
                
                    <Button size="lg" type="submit">
                        Connexion
                    </Button>
                    <Button size="lg" style={{marginLeft: "20px"}} onClick={()=> navigate("/")}>
                        Annuler
                    </Button>
                    <br/><br/>
                    <p>Vous n'avez pas de compte ?
                        <a href="/signup" style={{marginLeft: "10px"}}>Créer un compte</a>
                    </p>

                </Form>
            </div>
        </>
    );
};

export default Login;