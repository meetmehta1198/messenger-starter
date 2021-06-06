import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import AuthTemplate from "./components/Template/AuthTemplate";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  console.log("Inside login")

  const handleLogin = async (event) => {
    console.log("event",event)
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    // <Grid container justify="center">
    //   <Box>
    //     <Grid container item>
    //       <Typography>Need to register?</Typography>
    //       <Button onClick={() => history.push("/register")}>Register</Button>
    //     </Grid>
    //     <form onSubmit={handleLogin}>
    //       <Grid>
    //         <Grid>
    //           <FormControl margin="normal" required>
    //             <TextField
    //               aria-label="username"
    //               label="Username"
    //               name="username"
    //               type="text"
    //             />
    //           </FormControl>
    //         </Grid>
    //         <FormControl margin="normal" required>
    //           <TextField
    //             label="password"
    //             aria-label="password"
    //             type="password"
    //             name="password"
    //           />
    //         </FormControl>
    //         <Grid>
    //           <Button type="submit" variant="contained" size="large">
    //             Login
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </Box>
    // </Grid>
    <AuthTemplate type="login" handleLogin={handleLogin}></AuthTemplate>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
