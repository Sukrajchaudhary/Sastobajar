import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import LOGO from "../../../assets/bajar.png";
import { Link, Navigate } from "react-router-dom";
import {
  createUsersAsync,
  SignupError,
  signupLoading,
  SignUp,
} from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Common/Loading";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../context/AuthContext";
const Signup = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    userTypes: "",
    username: "",
    email: "",
    password: "",
    role: "",
    OrganizationsName: "",
    comformPassword: "",
  });
  const [error, setError] = useState({});
  const isLoading = useSelector(signupLoading);
  const ApiError = useSelector(SignupError);
  const RegisterUser = useSelector(SignUp);
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const validation = () => {
    let tempError = {};
    if (!value.userTypes) {
      tempError.userTypes = "Please choose User Types";
    }
    if (value.userTypes === "organizations" && !value.OrganizationsName) {
      tempError.OrganizationsName = "Please Enter Organization Name";
    }
    if (!value.username) {
      tempError.username = "Username is Required.";
    } else if (value.username.length < 4) {
      tempError.username = "Username must be at least 4 characters";
    } else {
      const usernameRegex = /^[a-zA-Z0-9_][a-zA-Z0-9_]*$/;
      if (!usernameRegex.test(value.username)) {
        tempError.username =
          "Username must start with a letter, number, or underscore";
      }
    }

    if (!value.email) {
      tempError.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.email)) {
        tempError.email = "Invalid email address";
      }
    }

    if (!value.password) {
      tempError.password = "Password is required";
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(value.password)) {
        tempError.password =
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
      }
    }
    if (value.password !== value.comformPassword) {
      tempError.comformPassword = "Passwords do not match";
    }

    setError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      dispatch(createUsersAsync(value));
    }
  };
  useEffect(() => {
    if (ApiError && ApiError?.error) {
      toast.error(ApiError.error.message);
    }
  }, [dispatch, ApiError]);

  if (isLoading) {
    return <Loading></Loading>;
  }
  // useEffect(() => {
  //   if (RegisterUser &&RegisterUser?.message) {
  //     toast.success("Signup SuccessFylly!");
  //     navigate("/Login");
  //   }
  // }, [dispatch,RegisterUser]);
  return (
    <>
      {RegisterUser && <Navigate to="/login"></Navigate>}
      <section className="rounded-md bg-[#F2F4F7]">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
          <div className="w-full max-w-md overflow-hidden border-2 p-6 mx-auto">
            <div className="mb-2">
              <img className="h-9 rounded-full" src={LOGO} alt="" />
            </div>
            <h2 className="text-2xl font-bold leading-tight text-black">
              Sign up to create account
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to="/Login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                {/* Sign Up As */}
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Sign Up As
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio"
                        name="role"
                        value="buyer"
                        onChange={handleChange}
                      />
                      <span className="ml-2">Buyer</span>
                    </label>
                    {error && <p className="text-red-600">{error.role}</p>}
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio"
                        name="role"
                        value="provider"
                        onChange={handleChange}
                      />
                      <span className="ml-2">Provider (Supplier)</span>
                    </label>
                  </div>
                </div>
                {/* User Types */}
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    User Types
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio"
                        name="userTypes"
                        value="individuals"
                        onChange={handleChange}
                      />
                      <span className="ml-2">Individual</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio"
                        name="userTypes"
                        value="organizations"
                        onChange={handleChange}
                      />
                      <span className="ml-2">Organization</span>
                    </label>
                  </div>
                </div>
                {/* Organizations Name */}
                {value?.userTypes === "organizations" && (
                  <div>
                    <label
                      htmlFor="organizations"
                      className="text-base font-medium text-gray-900"
                    >
                      Organizations Name
                    </label>

                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Organizations Name"
                        name="OrganizationsName"
                        onChange={handleChange}
                      ></input>
                    </div>
                    {error && (
                      <p className="text-red-600">{error.OrganizationsName}</p>
                    )}
                  </div>
                )}
                {/* Full Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error.username ? "border-red-600" : ""
                      }`}
                      type="text"
                      placeholder="Full Name"
                      name="username"
                      onChange={handleChange}
                    />

                    {error.username && (
                      <p className="text-red-600">{error.username}</p>
                    )}
                  </div>
                </div>
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error.email ? "border-red-600" : ""
                      }`}
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                    ></input>
                    {error.email && (
                      <p className="text-red-600">{error.email}</p>
                    )}
                  </div>
                </div>
                {/* Password */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error.password ? "border-red-600" : ""
                      }`}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    ></input>
                    {error.password && (
                      <p className="text-red-600">{error.password}</p>
                    )}
                  </div>

                  <p className="ml-auto cursor-pointer font-md text-gray-900">
                    <Link to="/forget-password">Forget Password ?</Link>
                  </p>
                </div>
                {/* Confirm Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className={`flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                        error.comformPassword ? "border-red-600" : ""
                      }`}
                      type="password"
                      placeholder="Confirm Password"
                      name="comformPassword"
                      onChange={handleChange}
                    ></input>
                    {error.comformPassword && (
                      <p className="text-red-600">{error.comformPassword}</p>
                    )}
                  </div>
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#2A3342] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
