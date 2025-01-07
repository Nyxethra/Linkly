import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listGroups } from "../../Redux/Actions/GroupActions";
import { listReports } from "../../Redux/Actions/ReportActions";
const TopTotal = (props) => {
  const dispatch = useDispatch();

  const groupList = useSelector((state) => state.groupList);
  const { groups } = groupList;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const reportList = useSelector((state) => state.reportList);
  const { reports } = reportList;
  useEffect(() => {
    dispatch(listGroups());
  }, []);

  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="friends_home_icon"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">All Users</h6> <span>{users?.length}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="groups_home_icon"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">All Groups</h6>
              <span>{groups?.length}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <div
              className="small_circle"
              style={{
                background: "#FB724B",
              }}
            >
              <img
                src={
                  "https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/dyUE00V7yM0.png"
                }
                alt=""
              />
            </div>

            <div className="text">
              <h6 className="mb-1">All reports</h6>
              <span>{reports?.length}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
