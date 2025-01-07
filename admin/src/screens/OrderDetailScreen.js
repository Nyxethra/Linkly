import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailmain";

const OrderDetailScreen = ({ match }) => {
  const id = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain id={id} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
