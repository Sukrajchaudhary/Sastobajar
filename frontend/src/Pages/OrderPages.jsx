import React from "react";
import Home from "../components/Home";
import UserOrders from "../components/order/components/UserOrders";
import Footer from "../components/Footer";
const OrderPages = () => {
  return (
    <div>
      <Home>
        <UserOrders />
      </Home>
      <Footer/>
    </div>
  );
};

export default OrderPages;
