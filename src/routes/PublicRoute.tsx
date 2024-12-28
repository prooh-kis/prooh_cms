import React, { ElementType, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { SIGN_IN } from "./routes";
import { Header } from "../components/header";

interface IProps {
  layout: ElementType;
}

export const PublicRoute = (props: any) => {
  const { children } = props;

  return (
    <div className="h-[100vh] w-[100vw] p-0 m-0">
      <Header />
      <div className="h-[90vh] w-[100vw] p-4">{children}</div>
    </div>
  );
};
