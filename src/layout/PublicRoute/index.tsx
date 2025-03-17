import React, { ElementType, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { SIGN_IN } from "../../routes/routes";
import { Header } from "../../components/header";

interface IProps {
  layout: ElementType;
}

export const PublicRoute = (props: any) => {
  const { children } = props;

  return (
    <div className="h-full w-full p-0 m-0">
      <Header />
      <div className="h-full w-full bg-gray-100">{children}</div>
    </div>
  );
};
