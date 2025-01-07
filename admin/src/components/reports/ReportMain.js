import React from "react";
import { Dots, Public } from "../../svg";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { keepReport, removeReport } from "../function/report";
import moment from "moment";
import Orders from "../orders/Orders";
import { listReports } from "../../Redux/Actions/ReportActions";
const ReportMain = () => {
  const dispatch = useDispatch();

  const reportList = useSelector((state) => state.reportList);
  const { loading, error, reports } = reportList;

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Reports</h2>
      </div>

      <div className=" mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status: all</option>
                <option>Active only</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <>
                {reports.length === 0 ? (
                  <>
                    {" "}
                    <div className="No_results">
                      <p>No reports to show</p>
                    </div>
                  </>
                ) : (
                  <>
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
                          {reports.map((report) => (
                            <tr key={report?._id}>
                              <td>
                                <b>
                                  {report?.userRef?.first_name}{" "}
                                  {report?.userRef?.last_name}
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
                                {report?.postRef &&
                                  !report?.commentRef &&
                                  "Post"}
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
                                {moment(report?.createdAt).format(
                                  "MMM Do YYYY, h:mm:ss a"
                                )}
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
                                          <span className="badge btn-danger">
                                            Banned
                                          </span>
                                        ) : (
                                          <span className="badge btn-danger">
                                            Delete
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <span className="badge btn-dark">
                                    Not action
                                  </span>
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
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportMain;
