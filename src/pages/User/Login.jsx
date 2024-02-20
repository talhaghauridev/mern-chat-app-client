import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../../api/baseUrl";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/validation";
import { useMessage, useNetwork } from "../../hook/hook";
import { Button, Heading, Input, MetaData } from "../../components/ui";
import inputError from "../../utils/inputError";
const initialValues = {
  email: "",
  password: "",
};
const Login = () => {
  const [userData, setUserData] = useState({
    loading: false,
    isAuthenicated: false,
    user: {},
    message: null,
    error: null,
  });
  const { error, message, loading } = userData;
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      if (values) {
        loginUser(values);
        console.log(values);
      }
    },
  });

  const { handleSubmit, getFieldProps } = formik;

  //Handle Login User
  const loginUser = async (values) => {
    console.log(values);
    try {
      setUserData((pev) => ({ loading: true, ...pev }));
      const { data } = await axios.post("/user/login", values);

      setUserData({
        loading: false,
        isAuthenicated: true,
        user: data?.user,
        message: data?.message,
      });

      localStorage.setItem(
        USER_INFO_KEY,
        JSON.stringify({
          isAuthenicated: true,
          user: data?.user,
          token: data.token,
        })
      );
    } catch (error) {
      setUserData((pev) => ({ error: error?.response?.data?.message, ...pev }));
    }
  };

  useMessage(error, message, "/chat");
  return (
    <>
      <MetaData title={"Login -- Chat App"} />
      <section
        id="login"
        className="relative overflow-hidden w-[100%] h-[100%]  flex flex-col gap-[20px] items-center justify-center h-[100vh] p-[15px]"
      >
        <div className="container max-w-[450px] m-auto bg-[white] rounded-[5px]">
          <Heading label={"Login"} className="pt-[20px]" />

          <form
            className="flex flex-col gap-[15px] px-[20px] sm:px-[24px] py-[25px] rounded-br-[8px] rounded-bl-[8px]"
            onSubmit={handleSubmit}
          >
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
              label={loading ? "Submitting..." : " Submit"}
              className="bg-[#3b5998]  px-[10px] py-[12px] text-[18px] mt-[10px]"
              type="submit"
              disabled={loading}
            />

            <button className=" bg-[#f3f5f9] px-[10px] py-[12px] font-Work flex gap-[2px]  mt-[16px]  items-center justify-center">
              {"Don't have account? "}
              <Link to={"/signUp"} className="underline">
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
