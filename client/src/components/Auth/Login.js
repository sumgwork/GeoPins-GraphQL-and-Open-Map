import React, { useContext } from "react";
import Context from "../../context";
import { GoogleLogin } from "react-google-login";
import { GraphQLClient } from "graphql-request";
import { withStyles } from "@material-ui/core/styles";
import { ME_QUERY } from "../../graphql/queries";
import Typography from "@material-ui/core/Typography";
import { BASE_URL } from "../../client";

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async googleUser => {
    try {
      const id_token = googleUser.getAuthResponse().id_token;
      //GraphQL request library is handy for simple requests (outside apollo)
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: id_token }
      });

      const { me } = await client.request(ME_QUERY);
      dispatch({ type: "LOGIN_USER", payload: me });
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });

      // console.log("me", me);
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = err => {
    console.log("Login failed", err);
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66, 133, 244)" }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId="73145862053-sipamua4kvh6dlrqj6hriderd86g1d9g.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
      />
    </div>
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
