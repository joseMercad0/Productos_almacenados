import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCAU_E9FFMD_NLoeH5vAi4D-wrftROqbM4",
    authDomain: "scandb-871f3.firebaseapp.com",
    databaseURL: "https://scandb-871f3-default-rtdb.firebaseio.com",
    projectId: "scandb-871f3",
    storageBucket: "scandb-871f3.appspot.com",
    messagingSenderId: "193608458019",
    appId: "1:193608458019:web:6341434bd8f6e0da89f696",
    measurementId: "G-ZJ6RC8X8T0"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const db = firebase.database();
  export { db };