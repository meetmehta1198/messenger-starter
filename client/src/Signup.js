import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "./store/utils/thunkCreators";
import AuthTemplate from "./components/Template/AuthTemplate";

const Login = (props) => {
  const { user, register } = props;

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
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
