import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./Common/Loading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getuserCartItemsAsync } from "./components/Cart/cartSlice";
import { useAuthContext } from "./context/AuthContext";
import {
  checkuserAsync,
  LoginUserDetails,
  LoginUserInfo,
} from "./components/Auth/authSlice";
// Lazy loading components
const Signup = lazy(() => import("./components/Auth/components/Signup"));
const Login = lazy(() => import("./components/Auth/components/Login"));
const ForgetPassword = lazy(() =>
  import("./components/Auth/components/ForgetPassword")
);
const SetNewPassword = lazy(() =>
  import("./components/Auth/components/SetNewPassword")
);
const HomePages = lazy(() => import("./Pages/HomePages"));
const Carts = lazy(() => import("./components/Cart/components/Carts"));
const ProductView = lazy(() =>
  import("./components/Product/components/ProductView")
);
const CheckOut = lazy(() => import("./components/Checkout/CheckOut"));
const UserOrder = lazy(() =>
  import("./components/order/components/UserOrders")
);

function App() {
  const dispatch = useDispatch();
  const { isAuth, setisAuth, setuserInfo } = useAuthContext();
  const LoginUser = useSelector(LoginUserDetails);
  const LoginUserResponse = useSelector(LoginUserInfo);
  useEffect(() => {
    if (LoginUser) {
      dispatch(getuserCartItemsAsync());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    dispatch(checkuserAsync());
  }, [dispatch, LoginUserResponse]);
  useEffect(() => {
    if (LoginUser) {
      setisAuth(true);
      setuserInfo(LoginUser);
    }
  }, [dispatch, LoginUser]);
  return (
    <Router>
      <Navbar />
      <Toaster />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/carts" element={<Carts />} />
          <Route path="/productView/:id" element={<ProductView />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/userorder" element={<UserOrder />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
