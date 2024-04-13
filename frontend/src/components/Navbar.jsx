import React, { useState, useEffect, useRef } from "react";
import { AlignJustify, X, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../assets/bajar.png";
import { createdCart} from "../components/Cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useAuthContext } from "../context/AuthContext";
import { LogOutUserAsync, logoutInfo } from "./Auth/authSlice";
const Navigations = [
  { name: "Home", path: "" },
  { name: "About", path: "" },
  { name: "Gallery", path: "" },
  { name: "Product", path: "" },
];
import toast from "react-hot-toast";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideProfile, setHideProfile] = useState(false);
  const dropdownRef = useRef(null);
  const TotalCartItems = useSelector(createdCart);
  const { isAuth, userInfo, setisAuth } = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogoutStatus = useSelector(logoutInfo);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 220);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current || !dropdownRef.current.contains(event.target)) {
        setHideProfile(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(LogOutUserAsync());
  };
  useEffect(() => {
    if (LogoutStatus) {
      toast.success(LogoutStatus.message);
      setisAuth(false);
    }

    navigate("/");
  }, [LogoutStatus]);
  return (
    <>
      <header
        className={`p-3 sticky top-0 z-50 duration-300 ${
          scrolled
            ? "bg-[#FFFFFF] shadow-sm border-b-[1px] border-black shadow-blue-400 "
            : "bg-[#2A3342]"
        }`}
      >
        <nav className="w-full flex justify-around items-center mx-auto relative">
          <Link to="/">
            <div className="flex justify-center items-center cursor-pointer">
              <img className="h-8 rounded-full" src={LOGO} alt="logo" />
            </div>
          </Link>
          <div>
            <ul className="hidden md:flex text-white gap-7">
              {Navigations.map((navigation, index) => (
                <li
                  className={`text-sm font-semibold font-serif cursor-pointer  pl-4 hover:border hover:rounded-sm hover:text-black  hover:bg-slate-300 ${
                    scrolled ? "text-black" : ""
                  }`}
                  key={navigation.name}
                >
                  {navigation.name}
                </li>
              ))}
            </ul>
            {/* mobile view */}
            <div
              ref={dropdownRef}
              className={`duration-300 fixed h-full backdrop-blur-md top-[61px] w-full bg-gray-600 flex md:hidden text-white ${
                isOpen ? "left-0" : "left-[-100%]"
              }`}
            >
              <ul className="flex gap-7 flex-col w-full justify-start duration-300">
                {Navigations.map((navigation, index) => (
                  <li
                    className={`text-sm font-semibold font-serif cursor-pointer pl-4 hover:border hover:rounded-sm hover:text-black  hover:bg-slate-300 ${
                      scrolled ? "text-[#838891]" : ""
                    }`}
                    key={navigation.name}
                  >
                    {navigation.name}
                  </li>
                ))}
              </ul>
            </div>
            {/* end of mobile view */}
            {/*  */}
          </div>

          <div className="flex gap-7">
            <div className="cursor-pointer relative flex justify-center items-center">
              <Link to="/Carts">
                <span className="text-red-500 absolute bottom-6 left-4 font-serif font-bold text-md">
                  {TotalCartItems.length}
                </span>
                <ShoppingCart size={25} color="#f2de02" />
              </Link>
            </div>
            {/* profile */}
            {isAuth ? (
              <div className="isolate flex -space-x-2 relative">
                <div
                  onClick={() => setHideProfile(!hideProfile)}
                  className="relative"
                >
                  <span   className="border flex justify-center items-center relative z-0  h-10 w-10 rounded-full ring-2 text-blue-600 cursor-pointer  font-bold text-lg">
                    {userInfo?.username.charAt(0).toUpperCase()}
                  </span>
                  {/* <img
                    className="relative z-0 inline-block h-10 w-10 rounded-full ring-2 ring-white cursor-pointer"
                    src="https://nextjs.org/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F35255%2F1665059775-delba.jpg&w=640&q=75"
                    alt="Delba"
                  /> */}
                </div>

                <div
                  className={`absolute right-0 top-11 z-50 h-40 w-56 border rounded-md bg-slate-100 ${
                    hideProfile ? "" : "hidden"
                  }`}
                  ref={dropdownRef}
                >
                  <div className="flex flex-col justify-start p-2 gap-3">
                    <p className="text-black w-full border border-b-2 text-md cursor-pointer duration-200 bg-green-200 hover:rounded-sm">
                      {"Hi:" + userInfo?.username}
                    </p>
                    <p className="text-black w-full  text-md cursor-pointer duration-200 hover:bg-slate-700 hover:rounded-sm hover:text-white">
                      My Profile
                    </p>
                    <Link to="/userorder">
                      <p className="text-black  text-md cursor-pointer duration-200 hover:bg-slate-700 hover:rounded-sm hover:text-white">
                        My Orders
                      </p>
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="text-black  text-md cursor-pointer duration-200 hover:bg-slate-700 hover:rounded-sm hover:text-white"
                    >
                      Sign out
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Link to="/signup">
                  <button className="inline-flex items-center gap-2 rounded-md border border-[#F14F4F] bg-[#F14F4F] px-5 py-2 text-white hover:bg-transparent hover:text-[#F14F4F] focus:outline-none ">
                    <span className="text-sm font-medium"> SIGNUP </span>
                    <svg
                      className="size-4 rtl:rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            )}
          </div>
          {/* hamburger menu */}
          <span
            className={`block md:hidden cursor-pointer ${
              scrolled ? "text-black" : "text-[#FFFF]"
            }`}
          >
            {isOpen ? (
              <X onClick={toggleMenu} />
            ) : (
              <AlignJustify onClick={toggleMenu} />
            )}
          </span>
          {/*end hamburger menu */}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
