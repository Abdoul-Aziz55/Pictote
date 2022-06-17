import React from 'react';
import Messagerie from '../components/Messagerie'
const Home = ({ message, setMessage }) => {
    /**
     * page home qui contient la messagerie
     */

    return (
        <Messagerie message={message} setMessage={setMessage} />
    );
};

export default Home;