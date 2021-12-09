import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
// import Container from 'react-bootstrap/Container'
import { Container } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { Card, TextField } from "@material-ui/core";
import styled from "styled-components";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";

import "./form.css";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import fire, { getAuth, onAuthStateChanged } from "../fire.js";
import { JoinPage } from "./JoinPage.js";
import SimpleList from "./NestedRoomList";
import { RoomPage } from "./RoomPage";
import { LoadingGifs } from "./smallComponents/LoadingGifs";
import { CreateRoomPage } from "./CreateRoomPage";

export const Home = (props) => {
  const [createPressed, ToggleCreatePressed] = useState(false);
  const [joinPressed, ToggleJoinPressed] = useState(false);
  const [isLoggedIn, ToggleisLoggedIn] = useState(false);
  const [showLoader, ToggleshowLoader] = useState(false) ;
  var usr;
  var usser;
  const [naam, setName] = useState("");
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const auth = getAuth();
  const [rooms, setRooms] = useState([]);

  const loc = useLocation();

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    const userEmail = localStorage.getItem("userEmail");
    await axios
      .post(
        "https://musictog-backend.herokuapp.com/api/fetch-rooms",
        { userEmail: userEmail },
        { header: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data);
        setRooms(response.data);
      });
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      localStorage.setItem("userEmail", user.email);
      usr = user;
      if (usr.displayName) {
        setName(usr.displayName);
      } else {
        setName(usr.email);
      }
      ToggleisLoggedIn(true);
    } else {
      nav("/login");
      ToggleisLoggedIn(false);
    }
  });

  async function handleCreateRoomm() {
    ToggleshowLoader(true) ; 
    var user_details = {
      email: usr.email,
      id: usr.uid,
    };
    axios
      .post("https://musictog-backend.herokuapp.com/api/create-room", user_details, {
        header: { "Content-type": "application/json" },
      })
      .then((response) => {
        console.log(`request complete: ${JSON.stringify(response.data)}`);
        var roomCode = response.data["code"];
        setCode(roomCode);
        console.log(roomCode);
        ToggleCreatePressed(true);
      });
  }

  function signOut() {
    getAuth().signOut();
    localStorage.removeItem("userEmail");
    nav("/");
  }

  const userEmail = localStorage.getItem("userEmail");
  return isLoggedIn ? (
    <Container
      xs={12}
      md={12}
      sm={12}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "20vw",
          height: "80vh",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.50)",
          backgroundColor: "rgba(255, 255, 255, 0.17)",
          backdropFilter: "blur(8.5px)",
          borderRadius: 10,
          border: "2px solid grey",
        }}
      >
        <div style={{ display: "flex", marginTop: 10 }}>
          <Avatar>{naam[0].toUpperCase()} </Avatar>
        </div>
        <h4 className="simpletext">{naam}</h4>
        <SimpleList roomList={rooms} />
      </Container>
      {showLoader? (
        createPressed?<CreateRoomPage code={code} userEmail={userEmail} />: <LoadingGifs text = "Creating the room...!" />
      ) : (
        <>
          {!joinPressed ? (
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "50vw",
                height: "50vh",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.50)",
                backgroundColor: "rgba(255, 255, 255, 0.17)",
                backdropFilter: "blur(8.5px)",
                borderRadius: 10,
                border: "2px solid grey",
              }}
            >
              <h2
                className="simpletext"
                style={{ color: "white", fontFamily: "`Poppins`, sans-serif " }}
              >
                Welcome back, {naam}
              </h2>
              <ButtonContainer>
                <button
                  className="button1"
                  onClick={() => {
                    handleCreateRoomm();
                  }}
                >
                  Create room
                </button>

                <button
                  className="button1"
                  onClick={() => {
                    ToggleJoinPressed(true);
                  }}
                >
                  Join Room
                </button>
              </ButtonContainer>

              <h1>
                Your are signed in
                <span onClick={signOut}>
                  <a href="#">Sign out</a>
                </span>
              </h1>
            </Container>
          ) : (
            <JoinPage />
          )}
        </>
      )}
    </Container>
  ) : (
    <div className="slash-card-page">
      <LoadingGifs text="Checking Login Status" />
    </div>
  );
};

const ButtonContainer = styled.div`
  margin: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
