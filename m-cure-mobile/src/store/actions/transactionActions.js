import axios from "axios";
import { useSelector } from "react-redux";
import { DETAIL_TRANSACTION_SUCCESS, GET_CATEGORIES_SUCCESS } from "./actionTypes"

const baseUrl = "https://m-cure-postgres.herokuapp.com"

export const getDetailSuccess = (payload) => {
  return {
    type: DETAIL_TRANSACTION_SUCCESS,
    payload
  }
}
export const getCategoriesSuccess = (payload) => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload
  }
}

// POST Add Transaction
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

// Get Detail Transactions by Id
export const getDetailTransactions = (id, access_token) => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${baseUrl}/users/transactions/${id}`, {
        headers: {
          "access_token": access_token
        }
      })
      dispatch(getDetailSuccess(response.data.data))
      return "success"
    } catch (error) {
      return error
    }
  }
}

// Get All Categories Transactions
export const getCategories = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`${baseUrl}/categories`)
      dispatch(getCategoriesSuccess(response.data.data))
      return "success"
    } catch (error) {
      console.log(error)
    }
  }
}

// Update Transaction
export const updateTransaction = (data, id, access_token) => {
  return async (dispatch) => {
    try {
      if (data.amount === "") {
        throw "Amount is required"
      } else if (data.transactionDate === "") {
        throw "Transaction Date is required"
      } else if (data.CategoryId === "") {
        throw "Transaction type is required"
      }

      let response = await axios.put(`${baseUrl}/users/transactions/${id}`, data, {
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

// Delete Transaction
export const deleteTransaction = (id, access_token) => {
  return async (dispatch) => {
    try {
      // swal confirm delete yes or no
      let response = await axios.delete(`${baseUrl}/users/transactions/${id}`, {
        headers: {
          "access_token": access_token
        }
      })
      return "success"
    } catch (error) {
      return error
    }
  }
}