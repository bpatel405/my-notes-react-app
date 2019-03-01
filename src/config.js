import firebase from 'firebase';
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyBVQGQ4DwJqToUGeFeEjM8BKabG2ux2fUM",
    authDomain: "my-notes-2fa1c.firebaseapp.com",
    databaseURL: "https://my-notes-2fa1c.firebaseio.com",
    projectId: "my-notes-2fa1c",
    storageBucket: "my-notes-2fa1c.appspot.com",
    messagingSenderId: "761603453110"
}

firebase.initializeApp(config);
var db = firebase.firestore();

export {db, firebase};