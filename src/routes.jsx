import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
const Chat = lazy(() => import("./pages/Chat/Chat"));
const Login = lazy(() => import("./pages/User/Login"));
const SignUp = lazy(() => import("./pages/User/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Navigate to={"/chat"} />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
