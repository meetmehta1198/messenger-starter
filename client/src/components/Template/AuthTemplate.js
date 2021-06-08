import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Container,
  Card,
} from "@material-ui/core";
import signupImage from "../../assets/images/SignUp.jpg";
const AuthTemplate = (props) => {
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const history = useHistory();

  const getTitle = (title) => {
    return (
      <Typography style={{ fontWeight: "bold", fontSize: "25px" }}>
        {title}
      </Typography>
    );
  };

  const validatePassword = (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }
    props.handleRegister(event);
  };

  const getUsernameField = () => {
    return (
      <FormControl>
        <TextField
          aria-label="username"
          label="Username"
          name="username"
          type="text"
          required
        />
      </FormControl>
    );
  };
  const getEmailAddressField = () => {
    return (
      <FormControl margin="normal" required>
        <TextField
          aria-label="email"
          label="E-mail address"
          name="email"
          type="text"
          required
        />
      </FormControl>
    );
  };

  const getPasswordField = () => {
    return (
      <Box>
        <FormControl margin="normal" required>
          <TextField
            label="Password"
            aria-label="Password"
            type="password"
            name="password"
            required
          />
        </FormControl>
      </Box>
    );
  };

  const getConfirmPasswordField = () => {
    return (
      <FormControl error={!!formErrorMessage.confirmPassword}>
        <TextField
          label="Confirm Password"
          aria-label="confirm password"
          type="password"
          inputProps={{ minLength: 6 }}
          name="confirmPassword"
          required
        />
        <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
      </FormControl>
    );
  };

  const getSubmitButton = (title) => {
    return (
      <Button
        type="submit"
        variant="contained"
        size="large"
        style={{ color: "white", background: "#0897d4", marginTop: "35px" }}
      >
        {title}
      </Button>
    );
  };

  const getHeaderButton = (text, buttonName, link) => {
    return (
      <div style={{ float: "right" }}>
        <Typography style={{ color: "#c0c2c0", fontSize: "15px" }}>
          {text}
          <Button
            type="submit"
            variant="contained"
            size="medium"
            style={{ color: "#0897d4", background: "white" }}
            onClick={() => history.push(link)}
          >
            {buttonName}
          </Button>
        </Typography>
      </div>
    );
  };

  const getLoginForm = () => {
    return (
      <>
        {getHeaderButton(
          "Don't have an account?",
          "Create account",
          "/register"
        )}

        <Container mt={5}>
          <Grid container justify="center">
            <form onSubmit={(event) => props.handleLogin(event)}>
              {getTitle("Welcome back!")}
              {getUsernameField()}
              {getPasswordField()}
              {getSubmitButton("Login")}
            </form>
          </Grid>
        </Container>
      </>
    );
  };

  const getSignupForm = () => {
    return (
      <Container justify="center" style={{ padding: "5%", width: "100%" }}>
        <form onSubmit={(event) => validatePassword(event)}>
          <Card justify="center" style={{ padding: "5%" }}>
            {getHeaderButton("Already have an account?", "Login", "/login")}
            <br />
            <br />

            <Grid justify="center">
              <Grid item>{getTitle("Create an account!")}</Grid>
              <Grid item>{getUsernameField()}</Grid>
              <Grid item>{getEmailAddressField()}</Grid>
              <Grid item>{getPasswordField()}</Grid>
              <Grid item>{getConfirmPasswordField()}</Grid>
              <Grid item>{getSubmitButton("Create")}</Grid>
            </Grid>
          </Card>
        </form>
      </Container>
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <img
            src={signupImage}
            alt="Signup"
            object-fit="cover"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          {props.type === "login" ? getLoginForm() : null}
          {props.type === "signup" ? getSignupForm() : null}
        </Grid>
      </Grid>
    </>
  );
};

export default AuthTemplate;
