
import React, { useEffect,useState } from 'react';
import './Sidebar.css';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton, Avatar }from '@mui/material';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';


function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(()=>{
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>(
      setRooms(snapshot.docs.map(doc=>(
        {
          id: doc.id,
          data: doc.data(),        
        })
        ))
        ));
        return()=>{
          unsubscribe();
        };
  },[]);
    const [{user},dispatch]= useStateValue();
  return (
    <div className='sidebar'>
       <div className='sidebar_header'>
           <Avatar src={user?.photoURL} />
           <div className='sidebar_right'>
              <IconButton>
                <DonutLargeIcon />
              </IconButton>              
              <IconButton>
                 <ChatIcon />
              </IconButton>
              <IconButton>
                 <MoreVertIcon />   
              </IconButton>             
            </div>       
       </div>
       <div className='sidebar_search'>
         <div className='search_container'>
            <SearchIcon />
            <input  placeholder='  search for the chat' type="text"></input>
         </div>
       </div>
       <div className='sidebar_chats'>
       <SidebarChat  addNewChat/>
       {rooms.map(room =>(
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
  ))}     
        </div>      
    </div>
  );
}
export default Sidebar;
