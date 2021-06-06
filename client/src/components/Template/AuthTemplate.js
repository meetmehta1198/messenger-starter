import React,{useState} from "react";
import { Redirect, useHistory } from "react-router-dom";

import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText
} from "@material-ui/core";
import signupImage from "../../assets/images/SignUp.jpg";
const AuthTemplate = (props) => {
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const history = useHistory();

  const getTitle = (title) => {
    return (
      <Box>
        <Typography style={{ fontWeight: "bold", fontSize: "25px" }}>
          {title}
        </Typography>
      </Box>
    );
  };

  const validatePassword=(event)=>{
    event.preventDefault();

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
        setFormErrorMessage({ confirmPassword: "Passwords must match" });
        return;
      }
      props.handleRegister(event)
  }

  const getUsernameField=()=>{
      return <Box><FormControl>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
            style={{ width: "500px" }}

                    required
                  />
                </FormControl>
                </Box>
  }
  const getEmailAddressField = () => {
    return (
      <Box>
        <FormControl margin="normal" 
            style={{ width: "500px" }}
        
        required>
          <TextField
            aria-label="email"
            label="E-mail address"
            name="email"
            type="text"
            required
          />
        </FormControl>
      </Box>
    );
  };

  const getPasswordField = () => {
    return (
      <Box>
        <FormControl margin="normal"  required>
          <TextField
            label="Password"
            aria-label="Password"
            type="password"
            name="password"
            required
            style={{ width: "500px" }}
          />
        </FormControl>
      </Box>
    );
  };

  const getConfirmPasswordField=()=>{
      return <Box>
          <FormControl error={!!formErrorMessage.confirmPassword}>
                 <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  style={{ width: "500px" }}
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
               </FormControl>

      </Box>
  }

  const getSubmitButton = (title) => {
    return (
        <Grid container justify="center">
      <Button
        type="submit"
        variant="contained"
        size="large"
        style={{ color: "white", background: "#0897d4",marginTop:"35px" }}
      >
        {title}
      </Button>
      </Grid>
    );
  };

  const getHeaderButton = (text,buttonName,link) => {
    return (
      
      <Box p={4} display="flex" justifyContent="flex-end">
        <Box mr={3} p={1}>
          <Typography style={{ color: "#c0c2c0", fontSize: "15px" }}>
            {text}
          </Typography>
        </Box>
        <Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{ color: "#0897d4", background: "white" }}
            onClick={()=>history.push(link)}
          >
            {buttonName}
          </Button>
        </Box>
      </Box>
    );
  };

  const getLoginForm = () => {
    return (
        <>
        {getHeaderButton("Don't have an account?","Create account","/register")}

      <Box mt={5}>
          <Grid container justify="center">
          <form onSubmit={(event)=>props.handleLogin(event)}>
          {getTitle("Welcome back!")}
          {getUsernameField()}
          {getPasswordField()}
          {getSubmitButton("Login")}
        </form>
          </Grid>
        
      </Box>
      </>
    );
  }

    const getSignupForm=()=>{
    
        return <>
        {getHeaderButton("Already have an account?","Login","/login")}
        <Box mt={5}>
          <Grid container justify="center">
          <form onSubmit={(event)=>validatePassword(event)}>
          {getTitle("Create an account!")}
          {getUsernameField()}
          {getEmailAddressField()}
          {getPasswordField()}
          {getConfirmPasswordField()}
          {getSubmitButton("Create")}
        </form>
          </Grid>
        
      </Box>
      </>
    }

    
  
  return (
    <>
      <Grid container>
      <Grid item xs={5}>
          <img
            src={signupImage}
            style={{width:"100%"}}
          />
        </Grid>
        <Grid item xs={7}>
          <Box>

            {props.type==="login"?getLoginForm():null}
            {
            props.type==="signup"?getSignupForm():null}
            
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthTemplate;
