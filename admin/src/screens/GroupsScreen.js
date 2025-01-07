import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainGroups from "../components/groups/MainGroups";

const GroupsScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainGroups />
      </main>
    </>
  );
};

export default GroupsScreen;
