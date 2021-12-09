import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/auth' ;
import {useAuthState} from 'react-firebase-hooks/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';




firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

async function  userNameCheck(docId) {

    var messageRef = firestore.collection("Users") ; 
    var snapshot = messageRef.doc()
}