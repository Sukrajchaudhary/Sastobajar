import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
const LatestProduct = ({ Product }) => {
  const boxRef = useRef(null);
  const handlePrev = () => {
    if (boxRef.current) {
      const width = boxRef.current.clientWidth;
      boxRef.current.scrollLeft -= width;
    }
  };

  const handleNext = () => {
    if (boxRef.current) {
      const width = boxRef.current.clientWidth;
      boxRef.current.scrollLeft += width;
    }
  };

  return (
    <div className="w-full bg-slate-300">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 flex flex-col justify-center items-center">
        <div className="mr-auto ml-4">
          <h1 className="text-2xl font-bold tracking-tight text-red-600">
            Latest Product
          </h1>
        </div>
        <div className="flex ml-auto gap-8 m-3">
          <button
            onClick={handlePrev}
            className="text-black border-black border-2 p-2 rounded-full w-12 hover:bg-gray-600 hover:text-white"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            className="font-[12px] text-black border-black border-2 p-2 rounded-full w-12 flex justify-center items-center hover:bg-gray-600 hover:text-white"
          >
            <ChevronRight size={28} />
          </button>
        </div>
        <div
          ref={boxRef}
          className="flex gap-4 w-full p-4 justify-center items-center  px-11 scroll-smooth overflow-hidden"
        >
          {Product.map((item, i) => (
            <Link to={`/productView/${item._id}`}>
              <div
                key={item.id}
                className="rounded-md border cursor-pointer hover:scale-105 duration-300"
              >
                <img
                  src={item.thumbnail}
                  alt="Laptop"
                  className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                />
                <div className="p-2">
                  <h1 className="inline-flex items-center text-lg font-semibold">
                    {item.title.slice(0, 20) + "...."}
                  </h1>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.description.slice(0, 18) + "...."}
                  </p>
                  <div className="mt-1">
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
                      {item.category}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center space-x-2">
                    <div className="flex">
                      <span className="block cursor-pointer rounded-sm   p-1 px-1 text-md font-medium">
                        Rating
                      </span>
                      <span className=" cursor-pointer rounded-sm flex justify-center items-center   p-1 px-2 text-md font-medium">
                        {item.rating}
                        <Star size={20} color="#e8ec13" strokeWidth={1.25} />
                      </span>
                    </div>
                    <div className="flex">
                      <span className="block cursor-pointer rounded-sm   p-1 px-2 text-md font-medium">
                        Price
                      </span>
                      <span className="block cursor-pointer rounded-sm   p-1 px-2 text-md font-medium">
                        ${item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestProduct;
