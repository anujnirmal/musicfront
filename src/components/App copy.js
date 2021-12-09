import React, { useState } from "react";
import fire, { getAuth, onAuthStateChanged} from "../fire.js";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Card, Container , Grid} from "@material-ui/core";
// import { Leftside } from "./Leftside.js";
// import { Rightside } from "./SignUp.js";
import parse from "html-react-parser" ;
import "./form.css";
import "./App.css";
// import { MyForm } from "./MyForm";
import Login from "./Login.js";
import SignUp from "./SignUp.js";





function App(){
    // creates as state to track user logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const auth = getAuth();
    // checked whether user is logged in, if logged in than 
    // change the state of isLoggedIn to true
    onAuthStateChanged(auth, (user) => {
        console.log(user);
        return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      });

    console.log('logged in?', isLoggedIn);

    function signOut() {
        auth.signOut();   
    }

    return (
        <div>
            <div className= "card_container">
                <Container class= "card" >
                    <Grid style = {{display:"flex"}} >  
                        <Router>
                                <Switch>
                                    <Route exact path="/">
                                        {!isLoggedIn ? (
                                            <Login />
                                            
                                        ) : (
                                            <h1>
                                            Your are signed in
                                            <span onClick={signOut}>
                                                <a href="#">Sign out</a>
                                            </span>
                                            </h1>
                                        )}
                                    </Route>
                                    <Route path="/signup">
                                        <SignUp />
                                    </Route>
                                </Switch>  
                        </Router>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default App;

















