import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LOGO from "../../../assets/bajar.png";
import {ResetPasswordLinkAsync,ErrorMessage,resetLink} from "../../user/userSlice";
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
const ForgetPassword = () => {
  const [value, setvalue] = useState({
    email: "",
  });
  const [error, setError] = useState({});
  const dispatch=useDispatch();
  const ApiError=useSelector(ErrorMessage);
  const ApiResponse=useSelector(resetLink);
  const handleChange = (e) => {
    setvalue({
      ...value,
      [e.target.name]: e.target.value,
    });
    setError({ ...error, [e.target.name]: "" });
  };
  const validate = () => {
    let tempError = {};
    if (!value.email) {
      tempError.email = "Email is Required.";
    }
    setError(tempError);
    return Object.keys(tempError).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(ResetPasswordLinkAsync(value))
    }
  };
  useEffect(()=>{
  if(ApiError){
    toast.error(ApiError.error.message)
  }
  },[dispatch,ApiError])
  return (
    <section className="rounded-md  bg-[#F2F4F7] ">
      <div className="flex items-center justify-center    px-4 py-24 sm:px-6 sm:py-24 lg:px-8">
        <div className="w-full max-w-md overflow-hidden border-2 p-6 mx-auto">
          <div className="mb-2">
            <img className="h-9 rounded-full" src={LOGO} alt="" />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">
            Forget Your Password.
          </h2>
          <p className="mt-2text-sm text-gray-600 ">
            Try Again?{" "}
            <Link
              to="/Login"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              SIGN IN
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
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
                    className={`
                    ${error.email ? "border-red-700" : ""}
                    flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                  ></input>
                  {error && <p className="text-red-700">{error.email}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={value.value===""}
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#2A3342] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Sent <ArrowRight className="ml-2" size={16} />
                </button>
              {ApiResponse&& ( <p className="text-green-600 font-medium">Reset Link has been Sent SuccessFully</p>)}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
