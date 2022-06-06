import React from 'react';
import Messagerie from '../components/Messagerie'
const Home = ({ message, setMessage }) => {

    return (
        <Messagerie message={message} setMessage={setMessage} />
    );
};

export default Home;