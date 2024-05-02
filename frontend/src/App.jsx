import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./Common/Loading";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getuserCartItemsAsync } from "./components/Cart/cartSlice";
import { useAuthContext } from "./context/AuthContext";
import Protected from "./components/Auth/components/Protected";
import Carts from "./Pages/CartPages";
import {
  checkuserAsync,
  LoginUserDetails,
  LoginUserInfo,
} from "./components/Auth/authSlice";
// Lazy loading components
const Signup = lazy(() => import("./Pages/SignupPages"));
const Login = lazy(() => import("./Pages/LoginPages"));
const ForgetPassword = lazy(() => import("./Pages/ForgetPasswordPages"));
const SetNewPassword = lazy(() => import("./Pages/SetNewPasswordPages"));
const HomePages = lazy(() => import("./Pages/HomePages"));

const ProductView = lazy(() => import("./Pages/ProductViewPages"));
const CheckOut = lazy(() => import("./Pages/CheckoutPages"));
const UserOrder = lazy(() => import("./Pages/OrderPages"));
const OrganizationHome = lazy(() => import("./Admin/components/Home"));
const UploadProduct = lazy(() => import("./Pages/UploadProductPages"));
const UserProducts = lazy(() => import("./Pages/UserProductsPages"));
function App() {
  const dispatch = useDispatch();
  const { isAuth, setisAuth, setuserInfo } = useAuthContext();
  const LoginUser = useSelector(LoginUserDetails);
  const LoginUserResponse = useSelector(LoginUserInfo);
  useEffect(() => {
    dispatch(getuserCartItemsAsync());
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

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route
            path="/organizations/uploadproduct/"
            element={<UploadProduct />}
          />
          <Route
            path="/organizations/view/product"
            element={<UserProducts />}
          />
          <Route
            path="/organizations/home"
            extact
            element={<OrganizationHome />}
          />
          <Route
            path="/carts"
            element={
              <Protected>
                <Carts />
              </Protected>
            }
          />
          <Route path="/productView/:id" element={<ProductView />} />
          <Route
            path="/checkout"
            element={
              <Protected>
                <CheckOut />
              </Protected>
            }
          />
          <Route
            path="/userorder"
            element={
              <Protected>
                <UserOrder />
              </Protected>
            }
          />
        </Routes>
      </Suspense>

      <Toaster />
    </Router>
  );
}

export default App;
