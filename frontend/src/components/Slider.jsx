import React from "react";
import { Slide } from "react-slideshow-image";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.jpeg";
import img3 from "../assets/3.jpeg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
const divStyle = {
  display: "flex",
  backgroundSize: "cover",
  height: "300px",
};

const slideImages = [
  {
    url: img1,
    caption: "Slide 1",
    content:
      "Through e-commerce platforms, individuals can not only buy but also sell their goods, empowering them to pursue entrepreneurship and contribute to the vitality of their local economies."
  },
  {
    url: img2,
    caption: "Slide 2",
    content:
      "Our platform provides intuitive interfaces, secure payment processing, and efficient shipping solutions, empowering entrepreneurs to expand their reach and contribute to the growth of their local economies.",
  },
  {
    url: img3,
    caption: "Slide 3",
    content:
      "We offer a specialized e-commerce platform designed for local businesses and artisans, enabling them to showcase and sell their products globally.",
  },
  {
    url: img4,
    caption: "Slide 3",
    content:
      "We offer a specialized e-commerce platform designed for local businesses and artisans, enabling them to showcase and sell their products globally.",
  },
  {
    url: img5,
    caption: "Slide 3",
    content:
      "We offer a specialized e-commerce platform designed for local businesses and artisans, enabling them to showcase and sell their products globally.",
  },
];

const Slider = () => {
  return (
    <>
      <div className="slide-container p-4 md:px-20 md:py-4  bg-gray-400">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(${slideImage.url})`,
                }}
              >
                <div className="w-full bg-black bg-opacity-75 h-full flex flex-col p-5 gap-4 justify-center items-center">
                  <div className="flex justify-start items-center flex-col ">
                    <p className="text-[#cb4444] font-bold text-2xl">
                      Well come to Your Sasto Bajar
                    </p>
                    <p className="font-normal text-[#FFFFFF] text-base text-justify md:text-center md:break-words  ">
                      {slideImage.content}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                    <Link to="/organizations/home">


                      <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600"
                      >
                        Gets Starts
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </div>
     
    </>
  );
};

export default Slider;
