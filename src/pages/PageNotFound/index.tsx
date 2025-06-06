import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-4xl">
        <span className="font-bold">404</span> | Page Not Found
      </p>
      <Link to="/">
        <p className="mt-1 text-sm underline text-[#129BFF]"></p>
        Go Home
      </Link>
    </div>
  );
};
