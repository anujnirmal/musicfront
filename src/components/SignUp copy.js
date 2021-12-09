import React, { useState } from "react";
import fire, { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "../fire.js";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import * as EmailValidator from 'email-validator';


const firestore = firebase.firestore();

function SignUp(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    console.log('logged in?', isLoggedIn);

    const handleSignUp = (e) => {
        e.preventDefault();
        const checkEmail = EmailValidator.validate(email);

        if(!checkEmail){
            console.log("Please check your email");
        }else if (password.length <= 7){
            console.log("Enter password greater 7 characters");
        }else if( checkEmail === true && password.length > 7 ){
            createUserWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const messagesRef = firestore.collection('Users');
            async function addToDB(){
                await messagesRef.add({
                    "email": email,
                    "uid": user.uid
                })}
            addToDB(); 

            onAuthStateChanged(getAuth(), (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  const uid = user.uid;
                  console.log(uid + "user is logged in");
                  setIsLoggedIn(true);
                  // ...
                } else {
                  // User is signed out
                  // ...
                  console.log("dont know what happened");
                }
              }); 

            })
            .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            // console.log(error);
            if(errorCode === "auth/email-already-in-use"){
                console.log("Email is already in use, please login or reset password");
            }else{
                console.log("Unknown error occured, error code= " + errorCode);
            }
            // ..
            });
            }  
    }
    

    return (
     <SignUpComp />       
    );    
}


function SignUpComp(){
    return (<div>  
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
            <input
                type="email"
                onChange={({ target }) =>     
                  setEmail(target.value)}
                placeholder="Email"
                required
            />
            <br />
            <input
                type="password"
                onChange={({ target}) => 
                  setPassword(target.value)}
                placeholder="Password"
                required
            />
            <br />
            <button type="submit">
                Sign Up
            </button>
            {/* <button type="submit" onClick={handleSignUp}>
                Sign Up
            </button> */}
        </form>
    </div>);
}

export default SignUp;