import { DETAIL_USER_SUCCESS, LOGIN_USER_SUCCESS } from "./actionTypes";
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

export const postLoginUser = (data) => {
  return async (dispatch) => {
    try {
      let response = await axios.post(`${baseUrl}/users/login`, data
      )
      let dataToSave = response.data
      dispatch(loginUserSuccess(dataToSave))
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