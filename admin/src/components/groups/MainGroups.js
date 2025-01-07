import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listGroups } from "../../Redux/Actions/GroupActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainGroups = () => {
  const dispatch = useDispatch();

  const groupList = useSelector((state) => state.groupList);
  const { loading, error, groups } = groupList;

  useEffect(() => {
    dispatch(listGroups());
  }, []);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">All Groups</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
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
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {/* Groups */}
              {groups.map((group) => (
                <div className="col" key={group._id}>
                  <div className="card card-user shadow-sm">
                    <div
                      className="card-header"
                      style={{ paddingTop: "26px", backgroundColor: "#F8D7DA" }}
                    >
                      <img
                        style={{
                          border: "3px solid #fff",
                          borderRadius: "12px",
                        }}
                        className="img-md"
                        src={group.cover}
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">{group.group_name}</h5>
                      <div className="card-text text-muted">
                        {/* {group.isAdmin === true ? (
                          <p className="m-0">Admin</p>
                        ) : (
                          <p className="m-0">User</p>
                        )}

                        <p>
                          <a href={`mailto:${group.email}`}>{group.email}</a>
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </section>
  );
};

export default MainGroups;
