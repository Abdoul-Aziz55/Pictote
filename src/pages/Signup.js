import React, {useState, useContext, useEffect} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { auth, db, storage } from "../Firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc} from "firebase/firestore"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Firebase/Auth';
import { ref, getDownloadURL } from "firebase/storage";


const Signup = () => {
    /**
     * page qui permet a un utilisateur nouveau de s'inscrire sur l application (sans verification de mail)
     */
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    // const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext);
    

    
    useEffect(() => {
        const verifyUserProfilePic = () => {
            if (currentUser) {
                const userRef = doc(db, "users", currentUser.uid);
                getDoc(userRef).then((doc) => {
                    if (doc.data() && doc.data().profilePicture) {
                        navigate("/home");
                    }
                });
            }
        }
        verifyUserProfilePic();
        
    }, [currentUser]) // redirection d un utilisateur qui est deja inscrit vers la page daccueil de l appli


    /***
     * function that validates in a soft way the user input
     * @returns {boolean}
     */
    function validateForm() { 
        return firstName.length >= 3  && email.length > 0 && password.length > 0 && confirmPassword.length > 0 && password === confirmPassword
                && email.indexOf('@') > - 1;
    }
    

    /***
     * function that handles the registration of the new user in the authentication handler
     * @param event
     */
    function handleSubmit(event) {
        event.preventDefault();
        createUserWithEmailAndPassword(
                auth,
                email,
                password)
        .then((userCredential) => {
            const defaultProfilPicture = ref(storage, "profilePictures/profil.jpg");
            getDownloadURL(defaultProfilPicture).then((url) => {
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    profilePicture: url,
                    // birthDate: birthDate,
                    email: email,
                    contacts: [],
        
        
                }) // keep track of the user on the database
                .then(() => {
                    setDoc(doc(db, "conversations", user.uid), {}) // create a new conversation for the user
                    .then(() => {
                        navigate("/home");
                    })
                })
            })

        })
        .catch((error) => {
            let errorCode = error.code;
            if (errorCode === "auth/email-already-in-use")
            {
                setError("Cette adresse mail est déjà utilisée.");
            }
            if (errorCode === "auth/invalid-email")
            {
                setError("Cette adresse mail est invalide.");
            }
            if (errorCode === "auth/weak-password")
            {
                setError("Le mot de passe doit contenir au moins 6 caractères.");
            }


        }
        );

    }


    const style = {
        display: 'flex',
        width: '100%',
        height: '100vh',
        flexGrow: '1',
        background: '#B0E0E6',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    };

    const logoStyle = {
        width: '350px',
        height: '100px',
        position: 'absolute',
        marginTop: '10px',
        marginLeft: '10px',
        cursor: 'pointer',
    }

    const errorStyle = {
        color: 'red',
        fontSize: '15px',

    }

    return (
        <>
            <img style={logoStyle} src="./img/logoP1.png" alt="logo" onClick={()=> navigate("/")} />
            <div className="Signup" style={style}>
                <h1><b>Inscription</b></h1><br/>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="firstName">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            autoFocus
                            type="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group size="lg" controlId="lastName">
                        <Form.Label>Nom de famille</Form.Label>
                        <Form.Control
                            autoFocus
                            type="lasttName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
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
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group size="lg" controlId="confirmPassword">
                        <Form.Label>Confirmation du mot de passe</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <br/>

                    {error && <p style={errorStyle}>{error}</p>}

                    <Button size="lg" type="submit" disabled={!validateForm()}>Créer un compte</Button>
                    <Button size="lg" style={{marginLeft: "20px"}} onClick={()=> navigate("/")}>Annuler</Button>
                    <br/><br/>
                    <p>Vous avez déjà un compte ?
                        <a href="/login" style={{marginLeft: "10px"}}>Connectez-vous</a>
                    </p>

                </Form>

            </div>
        </>
    );
};

export default Signup;