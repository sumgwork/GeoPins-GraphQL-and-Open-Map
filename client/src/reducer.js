export default function reducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: payload
      };
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        isAuth: false,
        currentUser: null
      };
    case "CREATE_DRAFT":
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        },
        currentPin: null
      };
    case "UPDATE_DRAFT_LOCATION":
      return {
        ...state,
        draft: payload
      };
    case "DISCARD_DRAFT":
      return {
        ...state,
        draft: null
      };
    case "GET_PINS":
      return {
        ...state,
        pins: payload
      };
    case "CREATE_PIN": {
      const prevPins = state.pins.filter(pin => pin._id !== payload._id);
      return {
        ...state,
        pins: [...prevPins, payload]
      };
    }
    case "SET_PIN": {
      return {
        ...state,
        currentPin: payload,
        draft: null
      };
    }
    default:
      return state;
  }
}
