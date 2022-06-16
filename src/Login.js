import React from 'react';
import {Button } from '@mui/material';
import './login.css';
import{auth, provider} from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
  const [{},dispatch]= useStateValue();
  const SignIn=()=>{
    auth.signInWithPopup(provider)
    .then(result=> {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
    }).catch((error)=>alert(error.message));
  };
  return (
    <div className='login'>
     <h1>LOGIN</h1>
       <div className='login_container'>
        <img src='./logo192.png' alt='' />
        <div className="login_text">
         <h1>sign in to watsup</h1>
        </div>
        <Button type='submit' onClick={SignIn}>Sign in with google</Button>
       </div>

    </div>
  )
}

export default Login;