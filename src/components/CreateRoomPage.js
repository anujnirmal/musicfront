import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { Card, TextField } from "@material-ui/core";
import { useNavigate, useLocation, Routes ,Route} from "react-router-dom";

import "./form.css";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import fire, { getAuth, onAuthStateChanged } from "../fire.js";
import {JoinPage} from './JoinPage.js'
import SimpleList from './NestedRoomList';
import { RoomPage } from "./RoomPage";
import { LoadingGifs } from "./smallComponents/LoadingGifs";

export const CreateRoomPage = (props) => {
   
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
   
    const nav = useNavigate();
    const onCopyText = () => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    };
  

    

    const EnterRoom = async (code, userEmail) => {
      setSpinnerLoading(true);
      var codeanduser = {
        userEmail: props.userEmail,
        code: props.code,
      };
        await axios
          .post("https://musictog-backend.herokuapp.com/api/join-myroom", codeanduser, {
            header: { "Content-Type": "application/json" },
          })
          .then((response) => {
            var res = JSON.stringify(response.data);
           if(response.status==200) {
              nav(`../room/${props.code}`);
            }
          });
    };
  
    return (
    
      <Container
        style={{
          margin: 10,
          display: "flex",
          flexDirection: "column",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card className="room-details">
          {" "}
          Room Code : {props.code}
          <CopyToClipboard text={props.code} onCopy={onCopyText}>
            <div className="copy-area">
              <button className="copy-button">
                {isCopied ? (
                  <div>Copied</div>
                ) : (
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </CopyToClipboard>
        </Card>
        {!spinnerLoading ? (
          <button
            className="button1"
            onClick={() => {
              EnterRoom();
            }}
          >
            Join My Room
          </button>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
           <LoadingGifs  text = "Entering the Room" />
          </div>
        )}
      </Container>
    
    );
  };
