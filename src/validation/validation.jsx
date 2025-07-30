import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(4, "Name must be at least 4 characters")
    .max(25, "Name must not exceed 25 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
    .required("Name is Required"),

  email: Yup.string().email("Invalid email format").required("Email is Required"),

  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(25, "Password must not exceed 25 characters")
    .required("Password is Required"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is Required"),

  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(25, "Password must not exceed 25 characters")
    .required("Password is Required"),
});
