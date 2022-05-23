import React, {useEffect, useState} from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StartingPage from './pages/StartingPage';
import ChooseProfilePic from './pages/ChooseProfilePic';
import ChooseDest from './pages/ChooseDest';
import { Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Navigate } from 'react-router';
import {db} from "./Firebase/firebase-config";
import {doc, updateDoc, arrayUnion} from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [dest, setDest] = useState(null);
  const [message, setMessage] = useState(null);
   

  const handleUserChange = (user) => {
    setUser(user);
  }




  const handleDestChange = (dest) => {
    console.log("modifying dest.." + dest);
    setDest(dest);
    localStorage.setItem("dest", dest);


  }

  const handleMessageChange = (message) => {
    setMessage(message);
    
  }

  const handleSubmitMessage = () => {
    const d = localStorage.getItem("dest");
    setDest(d);
    console.log("get dest from localstorage " + d );
    
    console.log(message);

    if (d && message){
      console.log("dest and message valid!!");
      const destRef = doc(db, "users", d);
      const senderRef = doc(db, "users", user.uid);

      const theNewmessage = {
        sender: user.uid,
        message: message,
        date: new Date().toLocaleString(),
      }

      
      updateDoc(destRef, {
        conversations: arrayUnion(theNewmessage),
      }).then(() => {
        console.log("message sent");
        updateDoc(senderRef, {
          conversations: arrayUnion(theNewmessage),
        }).then(() => {
          setMessage(null);
          setDest(null);
        }

        ).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }

  }

  useEffect(() => {
    const u = localStorage.getItem("user");
    u && JSON.parse(u) ? handleUserChange(u) : handleUserChange(null);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", user)
    localStorage.setItem("user", user)
    console.log("putting to local storage" + user);
    }, [user]);



    


  return (
    <DndProvider backend= {HTML5Backend}>
      <Routes>
        { !dest && <Route path="/chooseDest" element={<ChooseDest destChoose={(destUid) => handleDestChange(destUid)} messageSubmit={()=> {handleSubmitMessage()}}/>}  />}
        {!user && (
          <Route path="/" element={<StartingPage />} />
        )}
        {user && (
          <>
            <Route path="/home" element={<Home logOut={() => {handleUserChange(null)}} userUid={user.uid} messageChange={handleMessageChange}/>} />
            <Route path="/chooseProfilePic" element={<ChooseProfilePic userUid={user.uid} />} />
          </>
        )}
        

        {!user && (
          <>
            <Route path="/login" element={<Login logIn={(user) => {handleUserChange(user)}}/>} />
            <Route path="/signup" element={<Signup signUp={(user) => {handleUserChange(user)}}/>} />
          </>
        )}
        <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
        <Route element={<NotFound/>}/>
      </Routes>
    </DndProvider>
  );
}

export default App;
