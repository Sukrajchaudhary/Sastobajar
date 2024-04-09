import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Search } from "lucide-react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import Paginations from "../../../Common/Paginations";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import LatestProduct from "./LatestProduct";
import Loading from "../../../Common/Loading";
import {
  getAllUsersProductsAsync,
  Allproduct,
  Allcategory,
  getAllCategorytAsync,
  Loadingstate
  
} from "../productSlice";
import { useDispatch, useSelector } from "react-redux";
const sortOptions = [
  { name: "Best Rating", sort: "rating", order: Number(-1), current: false },
  { name: "Price: Low to High", sort: "price", order: Number(1), current: false },
  { name: "Price: High to Low", sort: "price", order: Number(-1), current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Product = () => {
  const [show, setShow] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [Filter, setFilter] = useState({});
  const dispatch = useDispatch();
  const Product = useSelector(Allproduct);
  const category = useSelector(Allcategory);
  const loading=useSelector(Loadingstate)
  const filters = [
    {
      id: "brand",
      name: "Brand",
      options: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: true },
        { value: "brown", label: "Brown", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "purple", label: "Purple", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: category,
    },
  ];
  const [Sort, setSort] = useState({});
  
  // filter
 
  const handlefilter = (e, section, option) => {
    const newFilter = { ...Filter };

    if (e.target.checked) {
      if (!newFilter[section.id]) {
        newFilter[section.id] = [];
      }
      newFilter[section.id].push(option.value);
    } else {
      if (newFilter[section.id] && newFilter[section.id].length > 0) {
        const index = newFilter[section.id].indexOf(option.value);
        if (index !== -1) {
          newFilter[section.id].splice(index, 1);
        }
      }
    }

    setFilter(newFilter);
  };
// sort
const handleSort=(e,option)=>{
 const sortOptions={_sort:option.sort,_order:option.order};
 setSort(sortOptions)
}
  useEffect(() => {
    dispatch(getAllUsersProductsAsync({Filter,Sort}));
    dispatch(getAllCategorytAsync());
  }, [dispatch,Filter,Sort]);
  const handleFocus = () => {
    setShow(true);
  };
  const handleBulor = () => {
    setShow(false);
  };
  return (
    <div className="bg-[#F7F8F9]">
      {loading ? (
        <Loading />
      ) : (
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-2">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200 ">
                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        onChange={(e) =>
                                          handlefilter(e, section, option)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 ">
            <div className="w-full flex md:justify-between justify-around items-center mx-auto relative border-b border-gray-200 pb-6 pt-4">
              <p
                className={`text-red-600 font-semibold ${show ? "hidden" : ""}`}
              >
                {" "}
                New Arrivals
              </p>

              <div className="flex justify-center items-center">
                <input
                  type="search"
                  placeholder="search..."
                  className={`md:w-96 h-9 md:flex ${show ? "flex" : "hidden"}`}
                />
                <span className="cursor-pointer md:hidden">
                  {" "}
                  <input
                    type="button"
                    value="w"
                    onFocus={handleFocus}
                    onBlur={handleBulor}
                  />
                </span>
              </div>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                             
                                className={classNames(
                                  option.current
                                    ? "font-lg text-gray-900 cursor-pointer"
                                    : "text-gray-500 cursor-pointer",
                                  active ? "bg-[#F7F8F9]" : "",
                                  "block px-4 py-2 text-sm cursor-pointer"
                                )}
                                onClick={(e)=>handleSort(e,option)}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-4">
                {/* Filters */}
                <form className="mt-4 border-t border-gray-200 ">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handlefilter(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-4">
                    {Product.map((item, index) => (
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
                                  <Star
                                    size={20}
                                    color="#e8ec13"
                                    strokeWidth={1.25}
                                  />
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
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Paginations></Paginations>
            </section>
          </main>
          <LatestProduct Product={Product} />
        </div>
      )}
    </div>
  );
};

export default Product;
