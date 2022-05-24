import { DETAIL_USER_SUCCESS, LOGIN_USER_SUCCESS, SAVE_HISTORY_SUCCESS } from "./actionTypes";
import axios from "axios";

const baseUrl = "https://m-cure-postgres.herokuapp.com"

export const loginUserSuccess = (payload) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload
  }
}
export const profileUserSuccess = (payload) => {
  return {
    type: DETAIL_USER_SUCCESS,
    payload
  }
}
export const saveHistory = (payload) => {
  return {
    type: SAVE_HISTORY_SUCCESS,
    payload
  }
}

export const postLoginUser = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${baseUrl}/users/login`, data
      )
      let dataToSave = response.data
      dispatch(loginUserSuccess(dataToSave))
      dispatch(getDetailUser(dataToSave.access_token))
      return "success"
    } catch (error) {
      return error.response.data.message
    }
  }
}

export const postRegisterUser = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${baseUrl}/users/register`, data)

      return "success"
    } catch (error) {
      return error.response.data.message
    }
  }
}

export const getDetailUser = (access_token) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${baseUrl}/users/detail`, {
        headers: {
          access_token
        }
      })
      dispatch(profileUserSuccess(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const chatHistory = (id, access_token) => {
  return async (dispatch) => {
    try {
      let response = await axios.post("https:///m-cure-postgres.herokuapp.com/users/histories", {
        consultationType: "chat",
        ConsultantId: id
      }, {
        headers: {
          access_token
        }
      })
      dispatch(saveHistory(response.data))
      return "success"
    } catch (error) {
      console.log(error, "EROORRR")
    }
  }
}