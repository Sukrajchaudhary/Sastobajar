import React from "react";
import Home from "../components/Home";
import Product from "../components/Product/components/Product";
import Slider from "../components/Slider"
import Footer from "../components/Footer";
import Testimonals from "../components/Testimonals"
const HomePages = () => {
  return (
    <div>
      <Home>
        <Slider></Slider>
        <Product></Product>
      </Home>
      <Testimonals/>
      <Footer/>
    </div>
  );
};

export default HomePages;
