const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.OATH_CLIENT_ID);

exports.findOrCreateUser = async token => {
  //Verify auth token
  const googleUser = await verifyAuthToken(token);

  // check if user exists in our DB
  const user = await checkIfUserExists(googleUser.email);

  //If user exists, return them

  return user ? user : createNewUser(googleUser);

  // otherwise create new user in DB
};

const verifyAuthToken = async token => {
  try {
    //returns a login ticket
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OATH_CLIENT_ID
    });

    return ticket.getPayload(); // returns complete user object
  } catch (err) {
    console.err("Error verifying auth token", err);
  }
};

const checkIfUserExists = async email => await User.findOne({ email }).exec();

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser;
  const user = { name, email, picture };
  return new User(user).save();
};
