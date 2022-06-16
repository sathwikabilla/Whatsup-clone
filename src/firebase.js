import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBwEd8HJhi6RYyztMys0jr_oEJBVcr1_mE",
    authDomain: "watsupclone-101d6.firebaseapp.com",
    projectId: "watsupclone-101d6",
    storageBucket: "watsupclone-101d6.appspot.com",
    messagingSenderId: "319990236778",
    appId: "1:319990236778:web:c033eacbb7faae5a55ac13",
    measurementId: "G-9BN7RQ2ZV6"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;
