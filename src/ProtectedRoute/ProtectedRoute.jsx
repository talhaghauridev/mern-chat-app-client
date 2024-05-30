import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { USER_INFO_KEY } from "../constants";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem(USER_INFO_KEY));

  if (!user) {
    return <Navigate to={"/login"}/>;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
