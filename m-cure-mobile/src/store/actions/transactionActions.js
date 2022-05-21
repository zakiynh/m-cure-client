import axios from "axios";
import { useSelector } from "react-redux";
import { DETAIL_TRANSACTION_SUCCESS } from "./actionTypes"

const baseUrl = "https://m-cure-origin.herokuapp.com"

export const getDetailSuccess = (payload) => {
  return {
    type: DETAIL_TRANSACTION_SUCCESS,
    payload
  }
}

export const postTransaction = (data, access_token) => {
  return async (dispatch) => {
    try {
      if (data.amount === "") {
        throw "Amount is required"
      } else if (data.transactionDate === "") {
        throw "Transaction Date is required"
      } else if (data.CategoryId === "") {
        throw "Transaction type is required"
      }

      let response = await axios.post(`${baseUrl}/users/transactions`, data, {
        headers: {
          access_token: access_token
        }
      })
      return "success"
    } catch (error) {
      return error
    }
  }
}

export const getDetailTransactions = (id, access_token) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${baseUrl}/users/transactions/${id}`, {
        headers: {
          "access_token": access_token
        }
      })
      console.log(response.data.data)
      dispatch(getDetailSuccess(response.data.data))
      return "success"
    } catch (error) {
      return error
    }
  }
}