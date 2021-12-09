import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import loadingLogo from "./loading.gif";
import { Avatar } from "@material-ui/core";
import "../form.css";

export const LoadingGifs = (props) => {
  return (
    <Container
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          margin: 20,
        }}
      >
        <Avatar
          src={loadingLogo}
          style={{
            height: "200px",
            width: "200px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.50)",
          }}
        ></Avatar>
      </Container>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
      </style>
      <p
       className = "loading-text"
      >
        {props.text}
      </p>  
    </Container>
  );
};
