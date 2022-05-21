import axios from "axios";
import { useSelector } from "react-redux";

const baseUrl = "https://m-cure-origin.herokuapp.com"

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