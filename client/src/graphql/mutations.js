export const CREATE_PIN_MUTATION = `
mutation($title: String!, $content: String!, $image: String!, $latitude: Float!, $longitude: Float!){
    createPin(input: {
        title: $title, content: $content, image: $image, latitude: $latitude, longitude: $longitude
    }){
        _id
        createdAt
        title
        image
        content
        longitude
        latitude
        author{
            _id
            name
            email
            picture  

        }
    }
}`;
