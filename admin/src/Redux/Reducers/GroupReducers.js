import {
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_LIST_RESET
} from "../Constants/GroupConstants";

// ALL GROUP
export const groupListReducer = (state = { groups: [] }, action) => {
  switch (action.type) {
    case GROUP_LIST_REQUEST:
      return { loading: true };
    case GROUP_LIST_SUCCESS:
      return { loading: false, groups: action.payload };
    case GROUP_LIST_FAIL:
      return { loading: false, error: action.payload };
    case GROUP_LIST_RESET:
      return { groups: [] };
    default:
      return state;
  }
};
