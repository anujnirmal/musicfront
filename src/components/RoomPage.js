import React, { useState, useEffect } from "react";
import fire, { getAuth, onAuthStateChanged } from "../fire.js";
import axios from "axios";
import { Container, Grid, Paper,Card, Typography } from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import {LoadingGifs} from "./smallComponents/LoadingGifs" ;
// import {ChatRoom} from './ChatAppUI/ChatRoom' ;

export const RoomPage = (props) => {
  const nav = useNavigate();
  const { roomid } = useParams();
  console.log(roomid);
  const [checking, setChecking] = useState(false);
  const [authCheck , setAuthCheck] = useState(false) ; 
  const [host, setRoomHost] = useState("") ; 
  const auth = getAuth() ; 

  useEffect(() => {
     
    onAuthStateChanged(auth, async (user) => {
      setAuthCheck(true) ;
      if (user) {
          setAuthCheck(false); 
          findIfRoomValid() ; 
       
      } else {
        nav("../../login");
      }
    });
  
     
  }, [])


 

  const findIfRoomValid = async () => {
    setChecking(true);
    const data = {
      roomCode: roomid,
    };
    await axios
      .post("https://musictog-backend.herokuapp.com/api/validate-room", data, {
        header: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.code=="200") {
            setRoomHost(res.data.host); 
            setChecking(false);
        }
        else {
           setTimeout(()=>{nav('../../home');}, 5000)  
        }
      });
  };

  return (
    <Container style = {{display:"flex", flexDirection:"column", justifyContent: "start", alignItems:"center", }}>
      
      {authCheck ? (
      
       checking?    <LoadingGifs text = {"Sit back, while we validate"} /> : <LoadingGifs text = {"Checking Login status...!"}/>
      
      ) : (
        
        <Grid container style = {{display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"center", }}>
        
         <Grid item  xs= {12} sm = {12} md = {12} lg = {6} >
           <Card style = {{display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"center",  textAlign:"center", borderRadius:10, padding: "20px", backgroundColor: "#a4508b",
backgroundImage: "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"}}>
           
           <Typography className = "simpletext" variant = "h5" style = {{color:"white"}}> 
             {roomid} 
           </Typography>
           <Typography className= "simpletext" style = {{color:"white"}}>
             Host: {host}
           </Typography>
           
           
            {/* <ChatRoom /> */}
         
           </Card>
         </Grid>
        </Grid>
      )}
    </Container>
  );
};
