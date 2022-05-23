import React from 'react';
import Messagerie from '../components/Messagerie'
const Home = ({logOut, userUid, messageChange}) => {
    const handleMessageChange = (message) => {
        messageChange(message);
    }

    return (
        <Messagerie logOut={logOut} userUid={userUid} messageChange={handleMessageChange} />
    );
};

export default Home;