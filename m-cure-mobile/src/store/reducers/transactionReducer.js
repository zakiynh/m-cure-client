import { DETAIL_TRANSACTION_SUCCESS } from "../actions/actionTypes";

const initialState = {
  detailTransactions: {
    // amount: "",
    // transactionDate: "",
    // Category: {
    //   id: "",
    //   name: "",
    //   type: "",
    //   icon: ""
    // }
  }
}

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_TRANSACTION_SUCCESS:
      return {
        ...state,
        detailTransactions: action.payload
      }
    default:
      return state
  }
}

export default transactionReducer