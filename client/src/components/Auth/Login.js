import React from "react";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess = googleUser => {
    console.log("googleUser", googleUser);
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("id_token", id_token);
  };

  const onFailure = err => {
    console.log("Login failed", err);
  };

  return (
    <GoogleLogin
      clientId="73145862053-sipamua4kvh6dlrqj6hriderd86g1d9g.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailure}
      isSignedIn={true}
    />
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);
