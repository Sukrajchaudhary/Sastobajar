import React from "react";
import { ArrowRight } from "lucide-react";
import LOGO from "../../../assets/bajar.png";
const SetNewPassword = () => {
  return (
    <section className="rounded-md  bg-[#F2F4F7] ">
      <div className="flex items-center justify-center    px-4 py-5 sm:px-6 sm:py-20 lg:px-8">
        <div className="w-full max-w-md overflow-hidden border-2 p-6 mx-auto">
          <div className="mb-2">
            <img className="h-9 rounded-full" src={LOGO} alt="" />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">
            Reset-Your Password.
          </h2>

          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Enter New-Password.{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Enter New-Password."
                    id="email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Comfrom Enter New-Password.{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder=" Comfrom   Enter New-Password."
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-[#2A3342] px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Comform <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SetNewPassword;
