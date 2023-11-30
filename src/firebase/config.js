import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWfhkTAlxpQ4S0wXOLROFdtI4D3Y_uUKo",
  authDomain: "bloggram-76a3f.firebaseapp.com",
  projectId: "bloggram-76a3f",
  storageBucket: "bloggram-76a3f.appspot.com",
  messagingSenderId: "516354076619",
  appId: "1:516354076619:web:df1ac8dcb065b19ac1104e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize database from firebase - firestore
const db = getFirestore(app);

export {db};