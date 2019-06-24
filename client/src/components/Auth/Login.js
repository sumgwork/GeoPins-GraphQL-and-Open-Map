import React, { useContext } from "react";
import Context from "../../context";
import { GoogleLogin } from "react-google-login";
import { GraphQLClient } from "graphql-request";
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
const ME_QUERY = `{
  me{
    _id
    name
    email
    picture
  }
}`;
const Login = ({ classes }) => {
  const { dispatch, state } = useContext(Context);

  const onSuccess = async googleUser => {
    const id_token = googleUser.getAuthResponse().id_token;
    //GraphQL request library is handy for simple requests (outside apollo)
    const client = new GraphQLClient("http://localhost:4000/graphql", {
      headers: { authorization: id_token }
    });

    const data = await client.request(ME_QUERY);
    dispatch({ type: "LOGIN_USER", payload: data.me });

    console.log("data.me", data.me);
  };

  const onFailure = err => {
    console.log("Login failed", err);
  };

  return (
    <>
      {state.currentUser && <p>{state.currentUser.name}</p>}
      <GoogleLogin
        clientId="73145862053-sipamua4kvh6dlrqj6hriderd86g1d9g.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
      />
    </>
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
