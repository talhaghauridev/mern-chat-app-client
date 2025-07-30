import { USER_INFO_KEY } from "@/constants";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ children, redirect = "/login" }) => {
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));

  if (!userInfo) {
    return (
      <Navigate
        to={redirect}
        replace
      />
    );
  }

  return children ? children : <Outlet />;
};

export default ProtectRoute;
