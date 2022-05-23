import { LOGIN_USER_SUCCESS } from "../actions/actionTypes";

const initialState = {
  email: "",
  username: "",
  access_token: "",
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        access_token: action.payload.access_token
      }
    default:
      return state
  }
}

export default userReducer