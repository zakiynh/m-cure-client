import { DETAIL_USER_SUCCESS, LOGIN_USER_SUCCESS, SAVE_HISTORY_SUCCESS } from "../actions/actionTypes";

const initialState = {
  detailUser: {
    id: "",
    email: "",
    username: "",
    name: "",
    imageProfile: "",
    Wallet: {
      ticketVideo: 0,
    }
  },
  access_token: "",
  currentHistory: {}
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        access_token: action.payload.access_token,
      }
    case DETAIL_USER_SUCCESS:
      return {
        ...state,
        detailUser: action.payload
      }
    case SAVE_HISTORY_SUCCESS:
      return {
        ...state,
        currentHistory: action.payload
      }
    default:
      return state
  }
}

export default userReducer