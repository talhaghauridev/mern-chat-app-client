import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "../../api/baseUrl";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../validation/validation";
import { Button, Heading, Input, MetaData } from "../../components/ui";
import { useMessage } from "../../hook/hook";
import inputError from "../../utils/inputError";
import { toast } from "react-toastify";
const initialValues = {
  name: "",
  email: "",
  password: "",
};
const SignUp = () => {
  const [userData, setUserData] = useState({
    loading: false,
    isAuthenicated: false,
    user: {},
    message: null,
    error: null,
  });
  const { error, message, loading } = userData;
  const [avatar, setAvatar] = useState("");

  //Error Hnadling
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      if (values) {
        registerUser({ avatar, ...values });
      }
    },
  });

  const { getFieldProps, handleSubmit } = formik;
  //Handle Avatar

  const handleAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = (el) => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //Handle Register User

  const registerUser = async (formData) => {
    try {
      setUserData((pev) => ({ loading: true, ...pev }));

      const { data } = await axios.post("/user/register", formData);

      setUserData((pve) => ({
        loading: false,
        isAuthenicated: true,
        user: data?.user,
        message: data?.message,
        ...pve,
      }));

      localStorage.setItem(
        USER_INFO_KEY,
        JSON.stringify({
          isAuthenicated: true,
          user: data?.user,
          token: data.token,
        })
      );
    } catch (error) {
      setUserData((pev) => ({
        error: error?.response?.data?.message || error?.message,
        ...pev,
      }));
      console.log(error);
    }
  };

  useMessage(error, message, "/chat");

  console.log(error);
  return (
    <>
      <MetaData title={"Sign Up -- Chat App"} />
      <section
        id="signUp"
        className="relative overflow-hidden w-[100%] flex flex-col gap-[20px] items-center justify-center h-[100vh] p-[15px]"
      >
        <div className="container max-w-[450px] m-auto bg-[white] rounded-[5px]">
          <Heading label={"Sign Up"} className="pt-[20px] pb-0" />

          <form
            className="flex flex-col gap-[15px] px-[20px] sm:px-[24px] py-[25px] pt-0 "
            onSubmit={handleSubmit}
          >
            {/* Name Input */}
            <Input
              label="Name"
              leftIcon={AlternateEmailOutlinedIcon}
              type="text"
              id="name"
              placeholder="Enter Your Name"
              {...getFieldProps("name")}
              error={inputError(formik, "name")}
            />

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

            {/* Upload Image Input  */}
            <div className={` flex gap-[20px] py-[15px] `}>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatar}
              />
            </div>

            <Button
              label={loading ? "Submitting..." : " Submit"}
              className="bg-[#3b5998] px-[10px] py-[12px] text-[18px] mt-[10px]"
              type="submit"
              disabled={loading}
            />

            <button className=" bg-[#f3f5f9] px-[10px] py-[12px] font-Work flex gap-[2px] items-center justify-center">
              Already have an account?
              <Link to={"/login"} className="underline">
                Login
              </Link>
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
