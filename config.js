import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8SDB-ZYJAgz5ssUA90NNPLIEckHJ33wA",
  authDomain: "db-c24.firebaseapp.com",
  databaseURL: "https://db-c24-default-rtdb.firebaseio.com",
  projectId: "db-c24",
  storageBucket: "db-c24.appspot.com",
  messagingSenderId: "534452593006",
  appId: "1:534452593006:web:43fdd904fccbb3c95d617f",
  measurementId: "G-ML9H6VQY3H",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
