import React, { useEffect, useState } from "react";
import { Trash, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItemAsync,
  updateCartAsync,
  createdCart,
  LoaddingState,
  getuserCartItemsAsync
} from "../cartSlice";
import toast from "react-hot-toast";
import Loading from "../../../Common/Loading";
const Carts = () => {
  const dispatch = useDispatch();
  const AllUserCartItems = useSelector(createdCart);
  const products = AllUserCartItems;
  const navigate = useNavigate();
  const isLoading = useSelector(LoaddingState);
  const totalAmount = products?.reduce(
    (total, product) => total + product?.product?.price * product.quantity,
    0
  );
  const handleDelete = (id) => {
    dispatch(deleteCartItemAsync(id));
    toast.success("Item Deleted Successfully !");
  };

  const handleQuantity = (e, id) => {
    dispatch(updateCartAsync({ _id: id, quantity: e.target.value }));
  };
  useEffect(() => {
    if (products.length <= 0) {
      navigate("/");
    }
  }, [products]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
        <h2 className="text-3xl font-bold">Your cart</h2>
        <p className="mt-3 text-sm font-medium text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius
          repellat ipsam, sit praesentium incidunt.
        </p>
        <ul className="flex flex-col divide-y divide-gray-200">
          {products?.map((product) => (
            <li
              key={product?.id}
              className="flex flex-col py-6 sm:flex-row sm:justify-between"
            >
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img
                  className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                  src={product?.product?.thumbnail}
                  alt={product?.name}
                />
                <div className="flex w-full flex-col justify-between pb-4">
                  <div className="flex w-full justify-between space-x-2 pb-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                        {product?.product?.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        ${product?.product?.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      {" "}
                      <label
                        htmlFor="qunatity"
                        className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                      >
                        OTY
                      </label>
                      <select
                        onChange={(e) => handleQuantity(e, product?._id)}
                        value={product.quantity}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex divide-x text-sm">
                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center space-x-2 px-2 py-1 pl-0"
                    >
                      <Trash size={16} />
                      <span>Remove</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 px-2 py-1"
                    >
                      <Heart size={16} />
                      <span>Add to favorites</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>
            Total amount:
            <span className="font-semibold">${totalAmount}</span>
          </p>
        </div>

        <div className="flex justify-end space-x-4">
          <Link to="/">
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Back to shop
            </button>
          </Link>
          <Link to="/checkout">
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-gray-700 hover:text-white"
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Carts;
