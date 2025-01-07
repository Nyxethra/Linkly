import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import ReportMain from "../components/reports/ReportMain";

const ReportScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ReportMain />
      </main>
    </>
  );
};

export default ReportScreen;
