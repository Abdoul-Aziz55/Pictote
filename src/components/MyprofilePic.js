import React from 'react';

const MyprofilePic = (props) => {
    const {picture} = props;

    return (
        <img className="myProfile" src={picture} alt={props}/>
    );
};

export default MyprofilePic;