
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect,useState } from 'react';
import {useStateValue} from './StateProvider';

function App() {
  const [{user}, dispatch]= useStateValue();
 // const [user,setUser]=useState();
  return (
    <div className="App">
      {!user ?(<Login />):(
      <div className='app__body'>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/"/>                     
          <Route path="/rooms/:roomId" element={<><Chat/></>}/>             
        </Routes>
      </Router>
        
      </div>)}
    </div>
  );
}

export default App;
