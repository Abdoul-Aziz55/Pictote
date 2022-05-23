import React from 'react';

// import {db} from '../Firebase/firebase-config';
// import {doc, getDoc} from 'firebase/firestore';


const ContactList = ({userUid}) => {

    // const [contacts, setContacts] = useState([]);

    // useEffect(() => {
    //     const userRef = doc(db, "users", userUid);
    //     getDoc(userRef).then((doc) => {
    //         setContacts(doc.data().contacts);
    //     }
    //     );

    // }, []);

    


    return (
        <div id="contactList" className="flex-grow-1">
            <div className="contact">
                <img className="famille" src="./img/39.jpg" alt="papi"/>
                <h3>Papi</h3>
            </div>
            <div className="contact">
                <img id="camille" src="./img/40.jpg" alt="camille"/>
                <h3>Camille</h3>
            </div>
            <div className="contact">
                <img className="orthophoniste" src="./img/38.jpg" alt="orthophoniste"/>
                <h3>Orthophoniste</h3>
            </div>

        </div>
        
    );
};

export default ContactList;