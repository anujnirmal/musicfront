import React, { useState,useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route ,Link, useNavigate} from 'react-router-dom';
import fire, { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, firebaseConfig } from "../fire.js";
import {onAuthStateChanged } from "../fire.js";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button, Grid, Container, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import LoginIcon from "@material-ui/icons/AccountCircle";
import Lock from '@material-ui/icons/Lock';
import { useFormik } from "formik";
import * as yup from "yup";
import logo from './logo.png';
import styled from 'styled-components';
import axios from "axios";
import { boolean } from "yup/lib/locale";
import glogo from './glogo.png';
import { handleGoogleLogin } from './firebaseFn/googleSignIn.js'
import { withStyles } from "@material-ui/core/styles";
import './form.css';
import {Home} from './MainPage';
import {SignUp} from './SignUp' ;
import {CircularProgress} from "@material-ui/core";





// fire.firestore();

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const provider = new GoogleAuthProvider();


const handleSubmit = async (userRes, e) => {
  console.log(userRes);
  var email = userRes.email; 
  var pass = userRes.pass;

  await signInWithEmailAndPassword(getAuth(), email, pass)
    .then((userCredential) => {
      // Signed in 
      const messagesRef = firestore.collection('Users');
      async function addData() {
        await messagesRef.add({
          "email": email,
        })
      }

      addData();
      const user = userCredential.user;

      console.log(user.email);
      console.log(user.uid);
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      const errorData = error.code
      //auth/user-not-found
      console.log('Incorrect username or password');
      console.log(errorData)
      if (errorData === "auth/user-not-found" || errorData === "auth/wrong-password") {
        console.log("Please Enter correct email or password");
      } else if (errorData === "auth/too-many-requests") {
        console.log("Too many attempts, please login after some time or reset password");
      } else {
        console.log("unknown error, error code = " + errorData);
      }
    });

}




const formValidation = yup.object({
  
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Bhai email dedo please"),
  pass: yup.string().required('You need to have a password').matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  )


});






export const Login = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const nav = useNavigate();

  console.log('logged in?', isLoggedIn);
var usr ;
 onAuthStateChanged(getAuth(), async (user) =>{
      if (user) {
       usr = user ;
      setIsLoggedIn(true) }
  });


  useEffect(() => {
    console.log("Here 1!!!!")
    if(isLoggedIn) {
      setTimeout(() => {
        console.log("This will appear after 6 seconds");
        nav('../home')
      }, 2000);
    
    }
    
    
  }, [isLoggedIn])

  function signOut() {
      getAuth().signOut();
      nav('/');
     
  }


 
  return (
   <div>   {!isLoggedIn ? (
    <LoginComp />
) : (
 <Loading />
)}
              

   </div>       
 );    
}
















export const LoginComp = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [text, setText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth() ; 
  var isLoggedin = false ;
  var userr ; 
  const nav = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: "",
      pass: ""
    },
    onSubmit: (values, { resetForm }) => {
      console.log("Yah tal chal raha hai");
      resetForm({ values: "" });
      handleSubmit(values);
    },
    validationSchema: formValidation,
  });

 


  return (
   
      <Container xs = {12} md = {12} sm = {12}  style={{
        display:"flex", justifyContent:"center",
      }}>
      <Container style = {{display:"flex", flexDirection:"column",justifyContent:"start", alignItems:"center", height:"80vh", width: "30vw",
     boxShadow : "0 8px 32px 0 rgba(31, 38, 135, 0.50)", backgroundColor: "rgba(255, 255, 255, 0.17)", backdropFilter: "blur(8.5px)", borderRadius:10, border: "2px solid grey"  }}>
    <div style = {{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}><form onSubmit={formik.handleSubmit}>
      <Grid xs = {12} sm = {12} md = {12} lg = {12} style = {{ width: "100%" , display:"flex", flexDirection: "column", alignItems: "center",  justifyContent: "center",}}>
      
       
      <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    </style>
    
     
       <Grid item lg ={6} md = {12} sm = {12} xs = {12}  style = {{ width: "100%" , justifyContent: "center", textAlign: "center",  alignItems: "center"}}>
       <img src= {logo} height="80"   style = {{ marginLeft:0 , marginBottom: 15}} />
       
          
          </Grid>
          <p style = {{color: "white", fontFamily: `'Poppins', sans-serif`, fontSize: 25, margin:0, marginBottom:20 }} >Login</p>  
        
        <div className="username-container">
          <p  className = "formhead" style = {{color: "rgb(212, 211, 211)", fontFamily: `'Poppins', sans-serif`,   fontSize: 15}}>Username or Email  *</p>
          <div className = "row">
          <LoginIcon  className= "logo"/>
          <TextField
            width = "100%"
            name="email"
            variant="outlined"
            onChange={formik.handleChange}
            inputLabelProps = {{style: {margin:0, fontSize: 10}}}
            inputProps = {{className: "textfield", style :{color: "white", width: "300px ", outline:"none !important"}}} 
            helperText = "Enter a username"
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          </div>
        </div>
       
    
        <div className="username-container">
          <p  className = "formhead" style = {{color: "rgb(212, 211, 211)", fontFamily: `'Poppins', sans-serif`,   fontSize: 15}}>Password*</p>
          <div className = "row">   
           <Lock className="logo" />   
           <TextField
            name="pass"   
            variant="outlined"
            onChange={formik.handleChange}
            inputLabelProps = {{style: {margin:0, fontSize: 10}}}
            inputProps = {{className: "textfield", style :{color: "white", width: "300px"}}} 
            value={formik.values.pass}
            error={formik.touched.pass && Boolean(formik.errors.pass)}
            helperText={formik.touched.pass && formik.errors.pass}
          />
          </div>
          <p style = {{color: "white" , fontSize: 12, float: "right" ,fontFamily: `'Poppins' , sans-serif`}}>Don't have an account? <u ><Link style = {{color: "yellow"}} to="/signup">Signup</Link></u ></p>
        </div>
    
        <button style={{marginTop:10}} className ='button' type="submit"> 
          Get the Party Started  
        </button>
    
    
      <div style = {{display:"flex"}}>
      
      <p style = {{display:"flex", color:"rgb(212, 211, 211)", fontSize:20 ,fontFamily: `'Poppins', sans-serif`}}>OR</p>
    
      </div>
    
    
      
     
      </Grid>
      </form>
      <button onClick={ async ()=>  { var user = handleGoogleLogin();
     }} className = 'button'>
    <img src= {glogo} height="25px" width= "25px" />
    Login with Google
    </button>
    </div>
    </Container >
      </Container>
    
    
    
    
    
    
      )
  
}












const MainContainer  = styled.div `
display: flex ; 
align-items: center ; 
flex-direction: column;
justify-content: start;
align-selft: center;
height:80vh ; 
width: 30vw ; 
background: rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
backdrop-filter: blur(8.5px);
-webkit-backdrop-filter: blur(8.5px);
font-family: "Poppins" , sans-serif; 
border: 2px solid grey;
border-radius: 8px ;
color: white;`;  





export const Loading = () => {
  return (
    
    <Container style = {{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center", height:"80vh", width: "30vw" }}> 
       <img src= {logo} height="150"   style = {{ marginLeft:0 , marginBottom: 15}} />
       <CircularProgress />
       <p className = "simpletext">Logging you in, redirecting to home. </p>    
    </Container>
   
  )
}
