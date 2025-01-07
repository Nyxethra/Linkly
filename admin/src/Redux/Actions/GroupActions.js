import {
  GROUP_CREATE_FAIL,
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_DELETE_FAIL,
  GROUP_DELETE_REQUEST,
  GROUP_DELETE_SUCCESS,
  GROUP_EDIT_FAIL,
  GROUP_EDIT_REQUEST,
  GROUP_EDIT_SUCCESS,
  GROUP_LIST_FAIL,
  GROUP_LIST_REQUEST,
  GROUP_LIST_SUCCESS,
  GROUP_UPDATE_FAIL,
  GROUP_UPDATE_REQUEST,
  GROUP_UPDATE_SUCCESS,
} from "../Constants/GroupConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listGroups = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GROUP_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:8000/getAllGroups`, config);

    dispatch({ type: GROUP_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: GROUP_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE GROUP
// export const deleteProduct = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: GROUP_DELETE_REQUEST });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     await axios.delete(`/api/products/${id}`, config);

//     dispatch({ type: GROUP_DELETE_SUCCESS });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     if (message === "Not authorized, token failed") {
//       dispatch(logout());
//     }
//     dispatch({
//       type: GROUP_DELETE_FAIL,
//       payload: message,
//     });
//   }
// };





