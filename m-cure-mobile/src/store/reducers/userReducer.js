import { DETAIL_USER_SUCCESS, LOGIN_USER_SUCCESS } from "../actions/actionTypes";

const initialState = {
  detailUser: {
    email: "",
    username: "",
    name: "",
    imageProfile: ""
  },
  access_token: "",
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        access_token: action.payload.access_token,
        detailUser: {
          email: action.payload.user.email,
          username: action.payload.user.username,
          name: action.payload.user.name,
          imageProfile: action.payload.user.imageProfile
        }
      }
    default:
      return state
  }
}

export default userReducer