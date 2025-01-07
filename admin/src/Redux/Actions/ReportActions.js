import {
  REPORT_LIST_FAIL,
  REPORT_LIST_REQUEST,
  REPORT_LIST_SUCCESS,
  DETAIL_REPORT_REQUEST,
  DETAIL_REPORT_SUCCESS,
  DETAIL_REPORT_FAIL,
} from "../Constants/ReportConstants";
import { logout } from "./userActions";
import axios from "axios";

export const listReports = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REPORT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/getReportsToAdmin`,
      config
    );

    dispatch({ type: REPORT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: REPORT_LIST_FAIL,
      payload: message,
    });
  }
};

export const getReport = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DETAIL_REPORT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/getReportById/${id}`,
      config
    );

    dispatch({ type: DETAIL_REPORT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DETAIL_REPORT_FAIL,
      payload: message,
    });
  }
};
