import { LOGIN_USER_SUCCESS } from "./actionTypes";
import axios from "axios";

const baseUrl = "https://m-cure-origin.herokuapp.com"

export const loginUserSuccess = (payload) => {
  return {
    type: LOGIN_USER_SUCCESS,
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
      return error
    }
  }
}