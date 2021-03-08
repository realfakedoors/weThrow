import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../hooks/use-auth";

const AdminRoute = ({ children, ...rest }) => {
  let auth = useAuth();

  return (
    <Route
      {...rest}
      render={() =>
        auth.adminStatus ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign_in",
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
