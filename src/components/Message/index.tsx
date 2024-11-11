import React, { useRef, ChangeEvent, useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/message.json";


export const Message: React.FC<any> = (props: any) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-9/12 max-w-full relative overflow-auto max-h-auto no-scrollbar"
        style={{ height: "50vh", width: "50vw" }}
      >
        <div className="flex flex-row justify-between items-center">
          {/* <button
            className="text-gray-500 hover:text-gray-700 absolute top-3 right-3"
            // onClick={onClose}
          >
            &times;
          </button> */}
        </div>

        <div className="">
          <Lottie 
            options={defaultOptions}
            height={props?.height || 300}
            width={props?.width || 300}
          />
          <div className="flex items-center justify-center">
            <h1 className="font-bold">
              {props?.message || "Message"}
            </h1>
            <p>
              {props?.content || ""}
            </p>
          </div>
        </div>
      </div>
  </div>
  );
};
