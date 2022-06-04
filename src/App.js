import React, {useState} from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StartingPage from './pages/StartingPage';
import ChooseProfilePic from './pages/ChooseProfilePic';
import ChooseDest from './pages/ChooseDest';
import { Routes, Route , BrowserRouter} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { Navigate } from 'react-router';
import { db } from "./Firebase/firebase-config";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { AuthProvider } from "./Firebase/Auth";

function App() {
  const [contacts, setContacts] = useState([]);
  const [dest, setDest] = useState(null);
  const [message, setMessage] = useState(null);


  const handleDestChange = (dest) => {
    setDest(dest);
    localStorage.setItem("dest", dest);

  }

  const handleSubmitMessage = (userUid) => {
    const d = localStorage.getItem("dest");
    setDest(d);
    if (d && message){
      const destRef = doc(db, "conversations", d);
      const senderRef = doc(db, "conversations", userUid);

      const theNewmessage = {
        sender: userUid,
        message: message,
        date: new Date().toLocaleString(),
      }
      getDoc(destRef).then(doc => {
        
        if (doc.data()[userUid]){
          updateDoc(destRef, userUid, arrayUnion(theNewmessage))
          .then(()=>{
            getDoc(senderRef).then(doc => {
              if (doc.data()[d]){
                updateDoc(senderRef, d, arrayUnion(theNewmessage))
                .then(() => {
                  setMessage(null);
                  setDest(null);
                })
              } else {
                setDoc(senderRef, {
                  [d]: [theNewmessage]
                }).then(() => {
                  setMessage(null);
                  setDest(null);
                  window.location.reload();
                })
      
              }
            });
          })
        } else {
          setDoc(destRef, {
            [userUid]: [theNewmessage]
          })
          .then(() => {
            getDoc(senderRef).then(doc => {
              if (doc.data()[d]){
                updateDoc(senderRef, d, arrayUnion(theNewmessage))
                .then(() => {
                  setMessage(null);
                  setDest(null);
                })
              } else {
                setDoc(senderRef, {
                  [d]: [theNewmessage]
                }).then(() => {
                  setMessage(null);
                  setDest(null);
                  window.location.reload();
                })
      
              }
            });
          })
        }

    })

      

    }
  }




  return (
    <AuthProvider>
      <DndProvider backend= {HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<PrivateRoute Component={<Home message={message} setMessage={setMessage}/>} alternativePath="/login"/>} />
            { !dest && message && <Route exact path="/chooseDest" element={<ChooseDest destChoose={(destUid) => handleDestChange(destUid)} messageSubmit={(userUid)=> {handleSubmitMessage(userUid)}}/>}  />}
           
            <Route path="/" element={<StartingPage/>} />
            
            <Route path="/chooseProfilePic" element={<ChooseProfilePic/>} />

            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>}/>
              
          
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </AuthProvider>
  );
}

export default App;
