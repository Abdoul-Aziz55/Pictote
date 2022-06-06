import React, {useState} from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StartingPage from './pages/StartingPage';
import ChooseDest from './pages/ChooseDest';
import { Routes, Route , BrowserRouter } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import NotFound from "./pages/NotFound";
import 'bootstrap/dist/css/bootstrap.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthProvider } from "./Firebase/Auth";

function App() {
  const [dest, setDest] = useState(null);
  const [message, setMessage] = useState(null);
   

  return (
    <AuthProvider>
      <DndProvider backend= {HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<PrivateRoute Component={<Home message={message} setMessage={setMessage}/>} alternativePath="/login"/>} />
            { !dest && message && <Route exact path="/chooseDest" element={<ChooseDest message={message} setMessage={setMessage} setDest={setDest}/>}  />}
           
            <Route path="/" element={<StartingPage/>} />
            
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
