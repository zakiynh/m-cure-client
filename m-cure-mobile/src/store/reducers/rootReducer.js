import { combineReducers } from "redux";
import userReducer from "./userReducer";
import transactionReducer from "./transactionReducer";

const rootReducer = combineReducers({
  user: userReducer,
  transaction: transactionReducer
})

export default rootReducer