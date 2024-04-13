import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserOrdersAsync, getUserOrders } from "../orderSlice";
import { useNavigate } from "react-router-dom";
import { ResetCartAsync } from "../../Cart/cartSlice";
const UserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getUserOrders);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUserOrdersAsync());
  }, [dispatch]);
  useEffect(() => {
    if (orders?.length < 0) {
      navigate("/");
    }
  }, [orders]);
  useEffect(() => {
    dispatch(ResetCartAsync());
  }, [dispatch]);
  return (
    <>
      {orders?.map((order, index) => (
        <div
          key={order._id}
          className="mx-auto h-full mt-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 border mb-4 "
        >
          <div className="">
            <h3 className=" font-semibold tracking-tighter text-black-900 p-3">
              Order_ID {""}: {"      "}
              <span className="bg-green-700  rounded-md text-gray-400 px-2 cursor-pointer">
                {order._id}
              </span>
            </h3>
            <h3 className="text-md font-bold tracking-tighter text-red-900">
              {order.status}
            </h3>
            <p className="mr-auto">{order?.createdAt ? new Date(order?.createdAt).toLocaleString():''}</p>
          </div>

          {order?.items?.map((item, index) => (
            <div
              key={item?.product?._id}
              className=" px-1 m-1 py-6 sm:px-6 border"
            >
              <div className="flow-root">
                <ul
                  key={index}
                  role="list"
                  className="-my-6 divide-y divide-gray-200"
                >
                  <li className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item?.product?.thumbnail}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href="#">{item?.product?.title}</a>
                          </h3>
                          <div>
                            <p className="ml-4">${item?.product?.price}</p>
                            <p className="ml-4 text-blue-700">
                              No of: items:{"  "}
                              {item?.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="mt-1 text-sm ">
                          {item?.product?.category}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item?.product?.description}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>TotalAmount</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items in Carts</p>
              <p>{order.totalItems} Items</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserOrders;
