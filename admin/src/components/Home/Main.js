import React, { useEffect } from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/userActions";
const Main = () => {
  const reportList = useSelector((state) => state.reportList);
  const dispatch = useDispatch();
  const { loading, error, reports } = reportList;
  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal reports={reports}  />

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder reports={reports} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
