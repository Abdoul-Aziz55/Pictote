import React, {useState, useEffect} from 'react';
import {db} from '../Firebase/firebase-config';
import {collection, getDocs, orderBy} from 'firebase/firestore';
import {useNavigate} from 'react-router';


const ChooseDest = ({destChoose, messageSubmit}) => {
    const navigate = useNavigate();
    const [destList, setDestList] = useState({});

    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        flexGrow: '1',
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

    const usersListStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '300px',
        height: '300px',
        overflowY: 'scroll',
    }

    const userStyle = {
        
        width: '80px',
        height: '80px',
        marginLeft: '10px',
        marginTop: '10px',
        border: '5px solid #B22222',
        borderRadius: '50%',
    }


    useEffect(() => {

        const usersListRef = collection(db, "users");
        getDocs(usersListRef, orderBy("profilePicture")).then((docs) => {
            docs.forEach((doc) => {
                setDestList( prevState => ({
                    ...prevState,
                    [doc.id]: doc.data().profilePicture
                }));
            });
        });
            
    }, []);

    const handleClick = (destUid) => {
        destChoose(destUid);
        messageSubmit();
        navigate("/home");
    }


    return (
        <>
            <img style={logoStyle} src="./img/logoP1.png" alt="logo" />
            <div className='chooseDest' style={style}>
                <p>Choisissez votre destinataire</p>
                <div className='destList' style={usersListStyle}>
                    {Object.keys(destList).map((user) => {
                        
                        return (
                            <img style={userStyle} key={user} src={destList[user]} alt="profilePicture" 
                            onClick={() => {handleClick(user)}}/>
                            
                        );
                    }
                    )}
                </div>
            </div>


        </>
    );
};

export default ChooseDest;