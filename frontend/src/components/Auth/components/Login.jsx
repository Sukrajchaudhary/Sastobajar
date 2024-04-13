import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import LOGO from "../../../assets/bajar.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginUserAsync, LoginError, LoginUserInfo } from "../authSlice";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
const Login = () => {

  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoginApiError = useSelector(LoginError);
  const LoginUserResponse = useSelector(LoginUserInfo);
  useEffect(() => {
    if (LoginUserResponse) {
      navigate("/");
    }
  }, [LoginUserResponse]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(LoginUserAsync(value));
    }
  };
  // validations
  const validate = () => {
    let tempError = {};
    if (!value.email) {
      tempError.email = "Email is Required.";
    }
    if (!value.password) {
      tempError.password = "Password is Required.";
    }
    setError(tempError);
    return Object.keys(tempError).length === 0;
  };
  useEffect(() => {
    if (LoginApiError && LoginApiError?.error) {
      toast.error(LoginApiError.error.message);
    }
  }, [LoginApiError]);
  return (
    <section className="rounded-md  bg-[#F2F4F7]">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
        <div className="w-full max-w-md overflow-hidden border-2 p-6 mx-auto">
          <div className="mb-2">
            <img className="h-9 rounded-full" src={LOGO} alt="" />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">
            Login to Your account
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className={`${
                      error.email ? "border-red-700" : ""
                    } flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  ></input>
                  {error && <p className="text-red-600">{error.email}</p>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className={`${
                      error.password ? "border-red-700" : ""
                    } flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  ></input>
                  {error && <p className="text-red-600">{error.password}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#2A3342] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Login <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
