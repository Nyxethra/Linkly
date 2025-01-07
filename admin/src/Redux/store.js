import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import { groupListReducer } from "./Reducers/GroupReducers";
import {
  ReportListReducer,
  ReportDetailsReducer,
} from "./Reducers/ReportReducres";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  groupList: groupListReducer,
  reportList: ReportListReducer,
  reportDetails: ReportDetailsReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
