import React, { useEffect } from "react";
import { EyeIcon, Star } from "lucide-react";
import Loading from "../../Common/Loading";
import {
  getUserProductAsync,
  UsercreatedProduct,
  Loadingstate
} from "../../components/Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const UserProduct = () => {
  const dispatch = useDispatch();
  const Product = useSelector(UsercreatedProduct);
  const isLoading=useSelector(Loadingstate)
  useEffect(() => {
    dispatch(getUserProductAsync());
  }, [dispatch]);
  if(isLoading){
    return <Loading/>
  }
  return (
    <div>
      <div className="lg:col-span-3">
        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-4">
          {Product.map((item, index) => (
        
              <div
                key={item.id}
                className="rounded-md border cursor-pointer hover:scale-105 duration-300"
              >
                <img
                  src={item.thumbnail}
                  alt="Laptop"
                  className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                />
                <div className="p-0">
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

                  <div className="mt-1 flex items-center ">
                    <div className="flex">
                      <span className=" cursor-pointer rounded-sm flex justify-center items-center   p-1 px-2 text-md font-medium">
                        {item.rating}
                        <Star size={20} color="#e8ec13" strokeWidth={1.25} />
                      </span>
                    </div>
                    <div className="flex">
                      <span className=" cursor-pointer rounded-sm   p-1 px-2 text-md font-serif">
                        Price
                      </span>
                      <span className=" cursor-pointer rounded-sm   p-1 px-2 text-sm font-serif">
                        $ {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
          
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProduct;
