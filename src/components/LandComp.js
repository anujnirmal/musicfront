import React from 'react'
import './form.css'
import {Link, Navigate,Routes, Route, NavLink} from 'react-router-dom';
import {Login} from './Login';

export const LandComp = () => {
    return (
       <div>    
        <p> Vplay  </p>
        Vplay is a social media player that lets you 
        share music across limitless people, devices and speakers,
         whether they're in the same room or halfway across the world. 
         Create & share your Vplay now
      
         <Link style = {{textDecoration: "none", fontFamily: "`Poppins`, sans-serif" , color:"white"}} to = "../login" >  <button className = "button">Get Started </button></Link>
        
        </div>
         
     
    )
}
