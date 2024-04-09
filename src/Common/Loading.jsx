import React from "react";
import { lineSpinner } from "ldrs";

lineSpinner.register();

// Default values shown

const Loading = () => {
  return (
    <>
      <div className="h-screen w-full relative Z-50 flex justify-center items-center">
        <div className="">
          <l-line-spinner
            size="80"
            stroke="3"
            speed="1"
            color="blue"
          ></l-line-spinner>
        </div>
      </div>
    </>
  );
};

export default Loading;
