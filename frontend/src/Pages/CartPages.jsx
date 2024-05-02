import React from "react";
import Carts from "../components/Cart/components/Carts";
import Home from "../components/Home";
import Footer from "../components/Footer";
const CartPages = () => {
  return (
    <div>
      <Home>
        <Carts />
      </Home>
      <Footer/>
    </div>
  );
};

export default CartPages;
