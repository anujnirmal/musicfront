import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJ01Wx7nn8gp0oWKekiTncOF6ssizcYPM",
    authDomain: "musictog-42164.firebaseapp.com",
    projectId: "musictog-42164",
    storageBucket: "musictog-42164.appspot.com",
    messagingSenderId: "436356140783",
    appId: "1:436356140783:web:f8db2de7b84eb8d78b951a",
    measurementId: "G-BCME0RR3D8"
};


const app = initializeApp(firebaseConfig);

const fire = app;

export default fire;
export {
    getAuth, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    firebaseConfig, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
};