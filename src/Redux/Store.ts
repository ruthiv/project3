import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { companyReducer } from "./CompanyState";
import { customerReducer } from "./CustomerState";

// Redux is Global State Menagment
const reducers = combineReducers({authReducer:authReducer, companyReducer: companyReducer, customerReducer: customerReducer})
const store = createStore(reducers);

export default store;