export const ME_QUERY = `{
    me{
      _id
      name
      email
      picture
    }
  }`;

export const GET_PINS_QUERY = `{
    getPins{
      _id
      createdAt
      title
      content
      image
      longitude
      latitude
      author{
        _id
        name
        email
        picture
      }
      comments{
        text
        createdAt
        author{
          _id
          name
          email
          picture
        }
      }
    }
  }`;
