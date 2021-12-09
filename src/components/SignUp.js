import React, { useState, useCallback } from "react";
import fire, { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "../fire.js";
import { BrowserRouter as Router, Routes, Route ,Link, useNavigate} from 'react-router-dom';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import {Login} from "./Login.js";
import { Button, Grid , Container } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import LoginIcon from "@material-ui/icons/AccountCircle";
import Lock from '@material-ui/icons/Lock';
import  Email  from "@material-ui/icons/Email";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from './logo.png' ; 
import styled from 'styled-components'
import { date, object } from "yup";
import axios from "axios";
import { boolean } from "yup/lib/locale";
import glogo from './glogo.png';
import {handleGoogleSignUp} from "./firebaseFn/googleSignIn";
import './form.css'; 






const firestore = firebase.firestore();





export const SignUp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useNavigate();

    console.log('logged in?', isLoggedIn);

    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          const uid = user.uid;
          console.log(uid + "user is logged in");
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
    })

    function signOut() {
        getAuth().signOut();
        history('/');
       
    }

    
   
       
    

    return (
        <div>
         
                            {!isLoggedIn ? (
                                <SignUpComp />
                            ) : (
                                <h1>
                                Your are signed in
                                <span onClick={signOut}>
                                    <a href="#">Sign out</a>
                                </span>
                                </h1>
                            )}
                     
        </div>       
    );    
}






const  handleSignUp =  async (userRes,e) => {
   
    

   
        await  createUserWithEmailAndPassword(getAuth(),  userRes['email'],userRes['pass'])
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
          console.log(user.displayName);
        const messagesRef = firestore.collection('UsersManually');
        async function addToDB(){
            await messagesRef.doc(user.uid).set({
                "email": userRes['email'],
                "uid": user.uid, 
                 'name': userRes['fullname'] , 
              
                
                
            })}
        addToDB().then(()=>{console.log('added db')}); 

        
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


const formValidation = yup.object({
    fullname: yup
      .string()
      .min(5, "Should be minimum 5 characters long")
      .max(30, "Should be Maximum 30 chars long")
      .required("Apka first name kya hai "),
    
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Bhai email dedo please"),
    pass: yup.string().required('You need to have a password').
    matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
  
   
  });

  export const SignUpComp= () => {
    const [text, setText] = useState("");
  
    // formSubmit //
    const formSubmit = (userRes ) => {
     
        handleSignUp( userRes) ; 
      
    };
  
    const formik = useFormik({
      initialValues: {
        fullname: "",
        email: "",
        pass: "",
      },
      onSubmit:  async (values, { resetForm }, text) => {
        resetForm({ values: "" });
       await formSubmit(values);
      },
      validationSchema: formValidation,
    });

    const history = useNavigate();
    function routeChange() {
      history.push('../')
    }
    
    return (
       <Container xs = {12} sm = {12} md = {12} lg = {12} style = {{display:"flex", flexDirection: "column", justifyContent:"center"  }}>
     <Container xs = {12} sm = {12} md = {12} lg = {12} style = {{display:"flex", flexDirection: "column",justifyContent: "start", height:"80vh", width: "30vw",  boxShadow : "0 8px 32px 0 rgba(31, 38, 135, 0.50)" , backgroundColor: "rgba(255, 255, 255, 0.17)", backdropFilter: "blur(8.5px)", borderRadius:10, border : "2px solid grey"}}>
     <form onSubmit={formik.handleSubmit}>
     <Grid xs = {12} sm = {12} md = {12} lg = {12} style = {{ width: "100%" , display:"flex", flexDirection: "column", alignItems: "center",  justifyContent: "center",}}>
     
       
      
     <Grid item lg ={6} md = {12} sm = {12} xs = {12}  style = {{ width: "100%" , justifyContent: "center", textAlign: "center",  alignItems: "center"}}>
     <img src= {logo} height="80"   style = {{ marginLeft:0 , marginBottom: 15}} />  
        </Grid>
            <p style = {{color: "rgb(250,251,251)", fontFamily: `'Poppins', sans-serif`, fontSize: 20, margin:0 }} >SignUp</p>  
          
          <div className="username-container">
            <p  className = "formhead" style = {{color: "rgb(212, 211, 211)", fontFamily: `'Poppins', sans-serif`,  fontSize: 15}}>Name*</p>
            <div className = "row">
            <LoginIcon  className= "logo"/>
            <TextField
              style = {{width:"100%"}}
              width = "100%"
              name="fullname"
              variant="outlined"
              onChange={formik.handleChange}
              inputLabelProps = {{style: {margin:0, fontSize: 10}}}
              inputProps = {{className: "textfield", style : {color:"white", width: "300px"}}} 
              helperText = "Enter your Name"
              value={formik.values.fullname}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
            />
            </div>
          </div>
          <div className="username-container">
            <p  className = "formhead" style = {{color: "rgb(212, 211, 211)", fontFamily: `'Poppins', sans-serif`,   fontSize: 15}}>Email*</p>
            <div className = "row">
           <Email className = "logo" />
             <TextField
              name="email"
              type="email"
              variant="outlined"
              onChange={formik.handleChange}
              inputLabelProps = {{style: {margin:0, fontSize: 10}}}
              inputProps = {{className: "textfield", style : {color:"white", width: "300px"}}} 
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            </div>
          </div>
      
          <div className="username-container">
            <p  className = "formhead" style = {{ color: "rgb(212, 211, 211)", fontFamily: `'Poppins', sans-serif`,   fontSize: 15}}>Password*</p>
            <div className = "row">
            <Lock className= "logo" />
             <TextField
              name="pass"
              
              variant="outlined"
              onChange={formik.handleChange}
              inputLabelProps = {{style: {margin:0, fontSize: 10}}}
              inputProps = {{className: "textfield", style : {color:"white", width: "300px"}}} 
              value={formik.values.pass}
              error={formik.touched.pass && Boolean(formik.errors.pass)}
              helperText={formik.touched.pass && formik.errors.pass}
            />
            </div>
  
            <p style = {{color: "white" , fontSize: 12, float: "right" ,fontFamily: `'Poppins' , sans-serif`}}>Already have an account? <Link  style = {{color:"yellow"}} to= "../login">Login</Link></p>
          </div>
  
          <button style = {{marginTop:10}}className = 'button' type= "submit">
          
          Get Started with Vplay
        </button>
             
        <p style = {{display:"flex", color:"rgb(211,211,211)", fontSize:20 ,fontFamily: `'Poppins', sans-serif`}}>OR</p>          
        
        </Grid>
        
        </form>

      <Container style ={{width: "80%", display: "flex", flexDirection:"center", alignItems:"center", justifyContent:"space-around"}}>
      <button onClick={()=>{handleGoogleSignUp().then((status)=>{
        status=="okay"?routeChange():console.log("not working");
      })}} className = "button" style ={{padding:"10px 10px"}}>
      <img  style = {{marginRight:5}} src={glogo} height="25px" width="25px" />
     
          Connect using Google
        </button>
      </Container>
     </Container>
       
        </Container>


      
    );
  };
  
  
  

  const StyledButton = styled.button `

background: linear-gradient(to right, #121742 0%, #03217b 79%);
border:none; 
border-radius: 2rem ;
padding: 0.5rem  5rem;
margin: 0 ;
display: flex;
font-family: "Poppins", sans-serif;
box-shadow: 0 8px 32px 0 rgba(31,38, 135,0.37) ;
color: white; 
width: 100% ;
cursor : pointer; 
`