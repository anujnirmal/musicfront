import fire, { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, firebaseConfig } from "../../fire.js";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/auth' ;
import {useAuthState} from 'react-firebase-hooks/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';




firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    promp:"select_account" 
}); 





async function handleGoogleLogin(){
    var userr ;
  await   signInWithPopup(getAuth(), provider)
    .then( async (result) => {
       
        console.log(result.user) ; 
        var userD = result.user ;
        var userEmail = userD.email ; 
        console.log(userEmail) ; 
        const messagesRef = firestore.collection('Users');
        const snapshot =  await messagesRef.where('email', '==', userEmail).get() ;
        if (snapshot.empty) {
            async function addData() {
                await messagesRef.doc(userD.uid).set({
                    "email": userD.email,
                    "name" : userD.displayName, 
                     "id" : userD.uid ,
                     
                })};

                addData().then((result)=>{console.log(result)});
                userr= userD; 
                
          }  
        else {
            console.log("user already exists so just logged in ") ;
        }

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Credentials: " + credential ) ;
        console.log("the user: " + user) ; 
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

    return userr ;
}






async function handleGoogleSignUp() {

    signInWithPopup(getAuth(), provider)
    .then( async (result) => {
       
        console.log(result.user) ; 
        var userD = result.user ;
        var userEmail = userD.email ; 
        console.log(userEmail) ; 
        const messagesRef = firestore.collection('Users');
        const snapshot =  await messagesRef.where('email', '==', userEmail).get() ;
        if (snapshot.empty) {
            async function addData() {
                await messagesRef.doc(userD.uid).set({
                    "email": userD.email,
                    "name" : userD.displayName, 
                     "id" : userD.uid ,
                     
                })};

                addData().then((result)=>{console.log(result)});
                
          }  
        else {
            console.log("user already exists so just logged in ") ;
        }

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Credentials: " + credential ) ;
        console.log("the user: " + user) ; 
        return "ok" ; 
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

}
export {handleGoogleSignUp} ;
export {handleGoogleLogin} ;