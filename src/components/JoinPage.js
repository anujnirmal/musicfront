import React, { useState ,useEffect} from "react";
import { Container, TextField, CircularProgress, Backdrop, Grid} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import "./form.css";
import axios from "axios";






const formValidation = yup.object({
    pass: yup
      .string()
      .required("This input cannot be empty")
      .min(10, "Should contain only 10 characters")
      .max(10, "Should contain only 10 characters"),
  });


export const JoinPage = (props) => {
 
  const nav = useNavigate() ;
  

  const formik = useFormik({
    initialValues: {
      pass: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("Yah tal chal raha hai");
      resetForm({ values: "" });
      handleSubmit(values);
    },
    validationSchema: formValidation,
  });

  const [roomCode, setroomCode] = useState("");
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [showError, setError] = useState('') ; 
  


  useEffect(() => {
    console.log("Here 1!!!!")
    if(showError!="") {
      setTimeout(() => {
        console.log("This will appear after 6 seconds");
        setError("") ; 
      }, 5000);
    
    }
    
    
  }, [showError])

  function handleSubmit(values) {
    setOpen(true); 
    console.log(values);
    console.log(values.pass);
    const userEmail = localStorage.getItem("userEmail");
    var postData = {
      userEmail: userEmail,
      code: values.pass,
    };
    axios.post("https://musictog-backend.herokuapp.com/api/join-room", postData, {
      header: { "Content-Type": "application/json" },
    }).then((response)=>{
       console.log(response.data); 
       if (response.data=="200") {
           nav(`../room/${values.pass}`); 
       }
       else {
           setError("We couldn't find the room"); 
           setOpen(false); 
          
       }
    });
  }

  return (
    <Container
      style={{
      
        display: "flex",
        flexDirection: "column",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      
      < Grid container  style = {{ display:"flex", flexDirection: "column", height:"auto", width: "auto",  margin: 10}}>
      { !open?
      
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
          <h3 className="simpletext">Enter the room code</h3>
        <TextField
          width="100%"
          name="pass"
          type="password"
          variant="outlined"
          onChange={formik.handleChange}
          inputLabelProps={{ style: { margin: 0, fontSize: 15 } }}
          inputProps={{
            className: "textfield",
            style: {
              color: "white",
              width: "300px ",
              outline: "none !important",
            },
          }}
          value={formik.values.pass}
          error={formik.touched.pass && Boolean(formik.errors.pass)}
          helperText={formik.touched.pass && formik.errors.pass}
        />
       
        <button className="button1" type="submit">
          Join the Room
        </button>
        {showError!=""?<div style={{backgroundColor:"linear-gradient(to right, #373b44, #4286f4)"}}>
          <p style ={{color:"linear-gradient(to right, #373b44, #4286f4)"}}>{showError}</p>
                  </div>: <div></div>}
      </form>:
      <span>
        
      <Backdrop
        sx={{ color: '#fffff', opacity: '1', zIndex: (theme) => theme.zIndex.drawer +1, display:'flex', flexDirection:"column", justifyContent:"center" }}
        open={open}
        
      >
        <CircularProgress color="inherit" />
        <div>
        <p className = "simpletext" > Validating the room</p>
        </div>
      </Backdrop>
      </span>}
      </Grid>
    </Container>
  );
};
