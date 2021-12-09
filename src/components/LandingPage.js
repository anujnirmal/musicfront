import React, { useState, useLocation, useEffect, Fragment } from 'react'
import { BrowserRouter, Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import fire, { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "../fire.js";
import { Login } from './Login.js';
import { SignUp } from './SignUp.js';
import { Home } from './MainPage';
import { RoomPage } from './RoomPage';
import { LandComp } from './LandComp';



export const LandingPage = (props) => {
    // const location = useLocation() ; 
    //      useEffect(() => {


    //        console.log(props.location.state.detail) ; 
    //      }, [location]);


    return (

        <div>

            <Routes>
                <Route path="/" element={<LandComp />} />

                <Route path="/home" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<SignUp />} />

                <Route path="room" element={<Navigate replace to = "/home" />} />
                
                <Route path = "room/:roomid" element = {<RoomPage />} />




            </Routes>


        </div>
    )
}
