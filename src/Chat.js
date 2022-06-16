import React,{useEffect , useState} from 'react';
import {IconButton, Avatar }from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import './Chat.css';
import {useParams} from 'react-router-dom';
import db from './firebase'; 
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';



function Chat() {
  const {roomId}=useParams();
  const [{user},dispatch]= useStateValue();
  const [input, setinput]= useState('');

  const SendMessage=(e)=>{
    e.preventDefault();
    console.log('you typed',input);
    db.collection('rooms').doc(roomId).collection('messages').add({
      message:input,
      name: user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),

    });
    setinput("");
  }

    const [seed,setSeed]= useState('');
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*100));
    },[])

    const[roomName,setRoomName]=useState("");
    const[messages,setMessages]=useState([]);
    useEffect(()=>{
      if(roomId){

        db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot)=>{
          setRoomName(snapshot.data().name)});

          db.collection('rooms')
          .doc(roomId).collection("messages")
          .orderBy('timestamp','asc')
          .onSnapshot(snapshot=>
            (setMessages(snapshot.docs.map((doc)=>doc.data())) ));        
        }      
    },[roomId]);
  return (
    <div className='chat'>
      <div className='chat_header'>
         <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}/>
         <div className='chat_header_info'>
          <h2>{roomName}</h2>
          <p>last seen {" "}{new Date(
            messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
            </p>
       </div>
       <div className='chat_header_right'>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
           </IconButton>
       </div>
      </div>
      <div className='chat_body'>
      { messages.map((message)=>(
        <p className={`chat_message ${message.name===user.displayName &&"chat_receiver"}`}>
            <span className='chat_name'>{message.name}
            </span>
            <span className='chat_content'>{message.message}
            </span>
           
            <span className='chat_timestamp'>
             {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
        </p>
      ))}
        
      </div>
      <div className='chat_footer'>
        <EmojiEmotionsIcon />
        <form>
           <input value={input} onChange={(e)=>setinput(e.target.value)} type='text'/>
           <button onClick={SendMessage} type='submit'>Send a message</button>
        </form>
        <MicIcon/>

      </div>

    </div>
  )
}

export default Chat;