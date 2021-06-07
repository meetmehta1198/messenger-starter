import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "./store/utils/thunkCreators";
import AuthTemplate from "./components/Template/AuthTemplate";

const Login = (props) => {
  
  const { user, register } = props;
  const [setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log("Inside handle register")
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthTemplate type="signup" handleRegister={handleRegister}></AuthTemplate>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
