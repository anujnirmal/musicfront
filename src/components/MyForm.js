import { React, useState } from "react";
import { Card, Container , Grid} from "@material-ui/core";
import "./form.css";
import {Login} from './Login.js';
import {SignUp} from  './SignUp.js'
import fire, { getAuth, onAuthStateChanged} from "../fire.js";
import { BrowserRouter as Router,Routes,  Route } from 'react-router-dom';
import parse from "html-react-parser" ;
import "./form.css";
import {Home} from './MainPage';


export const MyForm = () => {
 var userr ; 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();
  // checked whether user is logged in, if logged in than 
  // change the state of isLoggedIn to true
  onAuthStateChanged(auth, (user) => {
      console.log(user);
      user =userr; 
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });

  console.log('logged in?', isLoggedIn);

  function signOut() {
      auth.signOut();   
  }

 

  return (
 
       
          <Router>
                                <Routes>
                                    <Route exact path="/">
                                        {!isLoggedIn ? (
                                           <Login />
                                            
                                        ) : (
                                          <Home user = {userr} />
                                          
                                        )}
                                    </Route>
                                    <Route path="/signup">
                                        <SignUp />
                                    </Route>
                                </Routes>  
                        </Router>
        
  );
};
