import {
  REPORT_LIST_FAIL,
  REPORT_LIST_REQUEST,
  REPORT_LIST_SUCCESS,
  DETAIL_REPORT_REQUEST,
  DETAIL_REPORT_SUCCESS,
  DETAIL_REPORT_FAIL
} from "../Constants/ReportConstants";

export const ReportListReducer = (state = { reports: [] }, action) => {
  switch (action.type) {
    case REPORT_LIST_REQUEST:
      return { loading: true };
    case REPORT_LIST_SUCCESS:
      return { loading: false, reports: action.payload };
    case REPORT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ReportDetailsReducer = (
  state = { loading: true, report: [] },
  action
) => {
  switch (action.type) {
    case DETAIL_REPORT_REQUEST:
      return { ...state, loading: true };
    case DETAIL_REPORT_SUCCESS:
      return { loading: false, report: action.payload };
    case DETAIL_REPORT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};