import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../hooks/use-auth";

const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.userLoggedIn || localStorage.getItem("weThrowAuthToken") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/sign_in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
