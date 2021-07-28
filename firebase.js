import firebase from 'firebase';
import "firebase/firebase-storage";
import "firebase/firestore";
import firebase from "firebase/"


const firebaseConfig = {
    apiKey: "AIzaSyBpgHMhyAjlt8DGO7BZN8hXLO6dVx0oRDE",
    authDomain: "clone-of-amzon.firebaseapp.com",
    projectId: "clone-of-amzon",
    storageBucket: "clone-of-amzon.appspot.com",
    messagingSenderId: "159665687335",
    appId: "1:159665687335:web:a7038231e863538579f702"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();



export {db,auth};