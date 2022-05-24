import { LOGIN_USER_SUCCESS, VIDEO_CODE, STATUS } from "../actions/actionTypes";

const initialState = {
  email: "",
  username: "",
  access_token: "",
  videoCode: "",
  status: "",
  id: ""
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        email: action.payload.user.email,
        access_token: action.payload.access_token,
        id: action.payload.user.id,
        status: action.payload.user.status
      }
    case VIDEO_CODE:
      return {
        ...state,
        videoCode: action.payload.videoCode
      }
    case STATUS:
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state
  }
}

export default userReducer