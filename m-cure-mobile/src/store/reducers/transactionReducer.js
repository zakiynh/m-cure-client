import { DETAIL_TRANSACTION_SUCCESS, GET_CATEGORIES_SUCCESS } from "../actions/actionTypes";

const initialState = {
  detailTransactions: {
    "id": 1,
    "amount": 1000,
    "transactionDate": new Date(),
    "imageReceipt": null,
    "WalletId": 4,
    "CategoryId": 5,
    "createdAt": "2022-05-21T16:33:47.369Z",
    "updatedAt": "2022-05-21T16:33:47.369Z",
    "Category": {
      "id": 5,
      "name": "Income",
      "type": "Collect Interest",
      "icon": "https://static.moneylover.me/img/icon/icon_118.png",
      "createdAt": "2022-05-20T14:16:36.307Z",
      "updatedAt": "2022-05-20T14:16:36.307Z"
    }
  },
  allCategories: {
    expenseCategories: [],
    incomeCategories: []
  }

}

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_TRANSACTION_SUCCESS:
      return {
        ...state,
        detailTransactions: action.payload
      }
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        allCategories: action.payload
      }
    default:
      return state
  }
}

export default transactionReducer