import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createdCart, deleteCartItemAsync, updateCartAsync } from "../Cart/cartSlice";
import { LoginUserDetails, UpdateAddressAsync } from "../Auth/authSlice";
import { makeOrderAsync, UserOrders, OrderError } from "../order/orderSlice";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"
export default function CheckOut() {
  const [selectedAddress, setselectedAddress] = useState(null);
  const [paymentmethod, setpaymentmethod] = useState(null);
  const dispatch = useDispatch();
  const AllUserCartItems = useSelector(createdCart);
  const products = AllUserCartItems;
  const user = useSelector(LoginUserDetails);
  const order = useSelector(UserOrders);
  const error = useSelector(OrderError);
  const navigate=useNavigate()
  const totalAmount = products.reduce(
    (total, product) => total + product.product.price * product.quantity,
    0
  );
  const totalItems = products.reduce((total, item) => item.quantity + total, 0);
  const handleDelete = (id) => {
    dispatch(deleteCartItemAsync(id));
    toast.success("Item Deleted Successfully !");
  };

  const handleQuantity = (e, id) => {
    dispatch(updateCartAsync({ id: id, quantity: e.target.value }));
  };
  // hook-forms
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // handle Address
  const handleAddress = (e) => {
    setselectedAddress(user.addresses[e.target.value]);
  };

  // payment
  const handelPayment = (e) => {
    setpaymentmethod({ ...paymentmethod, [e.target.name]: e.target.value });
  };
  const handelOrder = (e) => {
    e.preventDefault();
    const order = {
      items: products,
      user: user?._id,
      totalAmount: totalAmount,
      paymentmethod: paymentmethod?.payments,
      totalItems: totalItems,
      selectedAddress: selectedAddress,
    };
    dispatch(makeOrderAsync(order));
  };
  useEffect(() => {
    if (order) {
      toast.success(order.message);
      navigate("/userorder")
    }
  }, [dispatch, order]);
  useEffect(() => {
    if (error && error.error) {
      toast.error(error.error.message);
    }
  }, [dispatch, error]);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8  gap-y-10 lg:grid-cols-5 border">
        <div className="lg:col-span-3 border p-2">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                UpdateAddressAsync({
                  addresses: [...user.addresses, data],
                })
              );
            })}
            className="bg-white px-4 mt-10"
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="name"
                        placeholder="Full name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("name", { required: "Name is Required." })}
                      />
                      {/* {errors.name && <p className="text-red-700">{errors.name}</p>} */}
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        placeholder="Email address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("email", {
                          required: "Email is Required.",
                        })}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phole"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="text"
                        type="tel"
                        placeholder="Phone Number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("phone", {
                          required: "Phone Number is Required.",
                        })}
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Street address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("street", {
                          required: "Street is Required.",
                        })}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="City"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("city", { required: "city is Required." })}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="State / Province"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("state", {
                          required: " State / Province is Required.",
                        })}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pincode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="ZIP / Postal code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register("ZIP", {
                          required: "ZIP /Postal code is required.",
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="reset"
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save Address
                </button>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from Existing Address
                </p>
                {/*  */}

                <ul role="list" className=" gap-3 bg-green-100 text-black">
                  {user?.addresses.length > 0 ? (
                    user?.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex px-7 gap-4  justify-between gap-x-6 py-5 border-solid border-2 border-gray-200"
                      >
                        <div className="flex gap-x-4">
                          <input
                            id="cash"
                            name="address"
                            type="radio"
                            value={index}
                            onChange={(e) => handleAddress(e)}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address?.name}
                            </p>
                            <p className="mt-1 truncate text-sm leading-5 text-gray-900">
                              {address?.email}
                            </p>
                          </div>
                        </div>
                        <div className=" sm:flex sm:flex-col sm:justify-between">
                          <p className="text-sm leading-6 text-gray-900">
                            {address?.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            2233
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-green-700 font-bold">
                      Please Add Your Shipping Address.
                    </p>
                  )}
                </ul>

                {/*  */}
                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      These are delivered via SMS to your mobile phone.
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          onChange={handelPayment}
                          id="cash"
                          value="cash"
                          name="payments"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash on Delivery
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          onChange={handelPayment}
                          value="card"
                          id="card"
                          name="payments"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="mx-auto mt-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:col-span-2">
              <div className="mx-auto mt-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <ul className="-my-7 divide-y divide-gray-200">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="flex flex-col py-6 sm:flex-row sm:justify-between"
                    >
                      <div className="flex w-full space-x-2 sm:space-x-4">
                        <img
                          className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                          src={product.product.thumbnail}
                          alt={product.name}
                        />
                        <div className="flex w-full flex-col justify-between pb-4">
                          <div className="flex w-full justify-between space-x-2 pb-2">
                            <div className="space-y-1">
                              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                                {product.product.title}
                              </h3>
                              <p className="text-sm">{product.color}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold">
                                ${product.product.price}
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
                                onChange={(e) => handleQuantity(e, product._id)}
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
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="mt-6 border-gray-200" />
              <form action="#" className="mt-6">
                <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                  <div className="flex-grow">
                    <input
                      className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter coupon code"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                    <button
                      type="button"
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </form>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center justify-between text-gray-900">
                  <p className="text-sm font-medium ">Total</p>
                  <p className="text-sm font-bold ">₹{totalAmount}</p>
                </li>
                <button
                  onClick={handelOrder}
                  type="submit"
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Order Now
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
