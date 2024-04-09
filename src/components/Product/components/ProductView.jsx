import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "../../../Common/Modal";
import { ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync, selectproduct } from "../productSlice";
import { createCartAsync, cartitems } from "../../Cart/cartSlice";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../context/AuthContext";
const ProductView = () => {
  const  {isAuth} =useAuthContext()
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const Product = useSelector(selectproduct);
  const items = useSelector(cartitems);
  useEffect(() => {
    dispatch(getProductAsync(params.id));
  }, [params.id]);

  const handleAddToCart = () => {
    if (isAuth) {
      const index = items.find((item) => item.cart.product=== Product._id);
      if (index) {
        toast.error("Item Already added !");
      } else {
        const ownerId = Product.owner[0]?._id;
        const newItems = {
          productOwner: ownerId,
          product: Product._id,
        };
        dispatch(createCartAsync(newItems));
        toast.success("Cart Added Successfully");
      }
    } else {
      setShowModal(true);
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {Product?.images &&
            Product?.images.map((image, index) => (
              <div
                key={index}
                className="col-span-1 transition duration-150 ease-in hover:opacity-90"
              >
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))}
        </div>
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {Product?.title}
            </h2>
            <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
              {Product?.description}
            </p>
            <div className="mt-5 flex items-center ">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                ${Product?.price}
              </div>
              <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                ${Product?.discountPercentage}
              </span>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-3  ">
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                size
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                {["S", "M", "L", "XL"].map((size) => (
                  <li
                    key={size}
                    className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm "
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 ">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                color
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                {[
                  "bg-orange-400",
                  "bg-pink-400",
                  "bg-violet-600",
                  "bg-red-500",
                ].map((color) => (
                  <li
                    key={color}
                    className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                  >
                    <span className={`block h-full w-full rounded ${color}`} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
            <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
              <button
                className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                disabled
              >
                +
              </button>
              <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                1
              </span>
              <button className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12">
                -
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to cart
            </button>
          </div>
          <div className="py-6 ">
            <ul className="space-y-5 pb-1 text-sm">
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  SKU:
                </span>
                N/A
              </li>
              <li>
                <span className="text-heading inline-block pr-2 font-semibold">
                  Category:
                </span>
                <a
                  className="hover:text-heading transition hover:underline"
                  href="#"
                >
                  {Product?.category}
                </a>
              </li>
              <li className="productTags">
                <span className="text-heading inline-block pr-2 font-semibold">
                  Tags:
                </span>
                <a
                  className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                  href="#"
                >
                  {Product?.brand}
                </a>
              </li>
            </ul>
          </div>
          <div className="shadow-sm ">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Product Details
              </h2>
              <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                <div className="bg-heading h-0.5 w-full rounded-sm" />
                <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
              </div>
            </header>
            <div>
              <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                Our Customer Experience Team is available 7 days a week and we
                offer 2 ways to get in contact.Email and Chat . We try to reply
                quickly, so you need not to wait too long for a response!.
              </div>
            </div>
          </div>
          <div>
            <header className="flex cursor-pointer items-start flex-col justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Additional Information
              </h2>
              {/*  */}
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <div className="text-md flex font-medium text-black">
                    <p>sukraj chaudhary</p>
                    <span>
                      <ShieldCheck size={24} color="#2c14e1" />
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    sukrajchaudhary90@gmail.com
                  </div>
                </div>
              </div>
              {/*  */}
            </header>
          </div>
          <div className="">
            <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
              <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                Customer Reviews
              </h2>
            </header>
          </div>
        </div>
      </div>

      <Modal
        message="You need to Login!"
        action="Login"
        cancelOption="Cancel"
        showModal={showModal}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default ProductView;
