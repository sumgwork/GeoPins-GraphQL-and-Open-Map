const user = {
  _id: "1",
  name: "Sumit",
  email: "sumgwork@gmail.com",
  picture: "image.jpg"
};

module.exports = {
  Query: {
    me: () => user
  }
};
