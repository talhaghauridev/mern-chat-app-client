import ChatSkeleton from "@/components/Chats/ChatSkeleton";
import ProtectRoute from "@/lib/ProtectRoute";
import lazyWithProgress from "@/utils/lazy-progress";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const Chat = lazy(() => import("@/pages/Chat/Chat"));
const Login = lazyWithProgress(() => import("@/pages/Auth/Login"));
const SignUp = lazyWithProgress(() => import("@/pages/Auth/SignUp"));
const NotFound = lazyWithProgress(() => import("@/pages/NotFound/NotFound"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectRoute />}>
        <Route
          path="/chat"
          element={
            <Suspense fallback={<ChatSkeleton />}>
              <Chat />
            </Suspense>
          }
        />
        <Route path="/" element={<Navigate to={"/chat"} />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
