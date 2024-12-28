import React, { ElementType, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { SIGN_IN } from "./routes";

interface IProps {
  layout: ElementType;
}

const PrivateRoute: React.FC<PropsWithChildren<IProps>> = (props) => {
  const { children, layout: Layout } = props;
  const { pathname } = useLocation();

  const isAuthenticated = true;

  return (
    <div>
      {isAuthenticated ? (
        <Layout>{children}</Layout>
      ) : (
        <Navigate
          to={{
            pathname: SIGN_IN,
            search:
              pathname && pathname !== "/"
                ? `?redirect=${pathname}`
                : undefined,
          }}
        />
      )}
    </div>
  );
};

export { PrivateRoute };
