import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useDispatch, useSelector } from "react-redux";
const LatestOrder = (props) => {
  const reportList = useSelector((state) => state.reportList);
  const { loading, error, reports } = reportList;

  return (
    <div className="card-body">
      <h4 className="card-title">New reports</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Annunciator</th>
                <th scope="col">Reported person/group</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th>Action</th>
                <th scope="col" className="text-end">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.slice(0, 5).map((report) => (
                <tr key={report?._id}>
                  <td>
                    <b>
                      {report?.userRef?.first_name} {report?.userRef?.last_name}
                    </b>
                  </td>
                  <td>
                    <b>
                      {report?.commentRef &&
                        report?.commentRef?.commentBy?.first_name +
                          " " +
                          report?.commentRef?.commentBy?.last_name}

                      {report?.postRef &&
                        !report?.commentRef &&
                        report?.postRef?.user?.first_name +
                          " " +
                          report?.postRef?.user?.last_name}

                      {report?.groupReportedRef &&
                        report?.groupReportedRef?.group_name}

                      {report?.userReportedRef &&
                        report?.userReportedRef?.first_name +
                          " " +
                          report?.userReportedRef?.last_name}
                    </b>
                  </td>
                  <td>
                    {" "}
                    {report?.commentRef && "Comment"}
                    {report?.postRef && !report?.commentRef && "Post"}
                    {report?.groupReportedRef && "Group"}
                    {report?.userReportedRef && "Profile"}
                  </td>
                  <td>
                    {report?.st !== null ? (
                      <span className="badge rounded-pill alert-success">
                        Solved
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert-danger">
                        Not resolved
                      </span>
                    )}
                  </td>
                  <td>
                    {moment(report?.createdAt).format("MMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td>
                    {report?.st !== null ? (
                      <>
                        {report?.st === "keep" ? (
                          <span className="badge btn-success">
                            {report?.st}
                          </span>
                        ) : (
                          <>
                            {report?.groupReportedRef ||
                            report?.userReportedRef ? (
                              <span className="badge btn-danger">Banned</span>
                            ) : (
                              <span className="badge btn-danger">Delete</span>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <span className="badge btn-dark">Not action</span>
                    )}
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link
                      to={`/report/${report?._id}`}
                      className="text-success"
                    >
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
