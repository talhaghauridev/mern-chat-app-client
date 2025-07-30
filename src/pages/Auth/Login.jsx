import axios from "@/api/baseUrl";
import { Button, Heading, Input, MetaData } from "@/components/ui";
import { LOGIN, USER_INFO_KEY } from "@/constants";
import { useMessage } from "@/hook/hook";
import { AlternateEmailOutlinedIcon, LockOutlinedIcon } from "@/icons";
import inputError from "@/utils/inputError";
import { initialLoginState, signupReducer } from "@/utils/reducers";
import { loginSchema } from "@/validation/validation";
import { useFormik } from "formik";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [state, dispatch] = useReducer(signupReducer, initialLoginState);
  const navigate = useNavigate();
  const { error, message, loading } = state;

  // Handle Login User
  const loginUser = async (values) => {
    try {
      dispatch({ type: LOGIN.REQUEST });
      const { data } = await axios.post("/user/login", values);

      dispatch({
        type: LOGIN.SUCCESS,
        payload: { user: data.user, message: data.message },
      });

      localStorage.setItem(
        USER_INFO_KEY,
        JSON.stringify({
          isAuthenticated: true,
          user: data.user,
          token: data.token,
        })
      );

      navigate("/chat");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      dispatch({
        type: LOGIN.FAILURE,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: loginUser,
  });

  const { handleSubmit, getFieldProps } = formik;
  useMessage(null, message, "/chat");

  return (
    <>
      <MetaData
          title={"Login - Chat App"}
          description={"Login to Chat App and start messaging in real time"}
        />
      <section
        id="login"
        className="relative overflow-hidden w-[100%]  flex flex-col gap-[20px] items-center justify-center h-[100vh] p-[15px]">
        <div className="container max-w-[450px] m-auto bg-[white] rounded-[5px]">
          <Heading
            label={"Login"}
            className="pt-[20px]"
          />

          <form
            className="flex flex-col gap-[15px] px-[20px] sm:px-[24px] py-[25px] rounded-br-[8px] rounded-bl-[8px]"
            onSubmit={handleSubmit}>
            {/* Email Input */}
            <Input
              label="Email Address"
              leftIcon={AlternateEmailOutlinedIcon}
              placeholder="Enter Your Email"
              type="email"
              id="email"
              {...getFieldProps("email")}
              error={inputError(formik, "email")}
            />

            {/* Password Input */}
            <Input
              label="Password"
              leftIcon={LockOutlinedIcon}
              placeholder="Enter Your Password"
              type="password"
              id="password"
              {...getFieldProps("password")}
              error={inputError(formik, "password")}
            />

            <Button
              label={loading ? "Submitting..." : "Submit"}
              className="bg-[#3b5998] px-[10px] py-[12px] text-[18px] mt-[10px]"
              type="submit"
              disabled={loading}
            />

            <button className="bg-[#f3f5f9] px-[10px] py-[12px] font-Work flex gap-[2px] mt-[16px] items-center justify-center">
              {"Don't have an account? "}
              <Link
                to="/signup"
                className="underline">
                Sign Up
              </Link>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
