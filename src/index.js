import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV9FApjahMDmzSrnOPKQrxK3afT82WyqQ",
  authDomain: "cart-7e91f.firebaseapp.com",
  projectId: "cart-7e91f",
  storageBucket: "cart-7e91f.appspot.com",
  messagingSenderId: "429732761152",
  appId: "1:429732761152:web:ccdbb1f047d0915a4919a5"
};

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


