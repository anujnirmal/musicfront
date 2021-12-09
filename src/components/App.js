import { React, useState,useEffect } from "react";
import { Container } from "@material-ui/core";
import "./App.css";
import { MyForm } from "./MyForm.js";
import style from 'styled-components';
import fire, { getAuth, onAuthStateChanged } from "../fire.js";
import { useLocation } from 'react-router-dom';
import { Home } from './MainPage.js'
import { LandingPage } from './LandingPage';
import { Login } from './Login'
import { SignUp } from './SignUp';
// import {ChatRoom} from './ChatAppUI/ChatRoom.js';

function App() {
// var userr;
//  const [isLoggedIn, setIsLoggedIn] = useState(false);
//  const auth = getAuth();

 
 
// //  useEffect(() => {
// //     console.log(location.pathname); // result: '/secondpage'
   
// //     console.log(location.state.details); // result: 'some_value'
// //  }, [location]);


//   function signOut() {
//     auth.signOut();
//   }









  return (<Container style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
       {/* <ChatRoom />  */}
       <LandingPage />
      
  </Container>);


}

export default App;