import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state?.auth?.isAuthenticated,
  }));
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/signin"
        state={{
          from: location?.pathname,
        }}
      />
    );
  }

  return children;
};

export default PrivateRoute;
