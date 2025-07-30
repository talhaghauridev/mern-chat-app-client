const inputError = (formik, name) => {
   return formik && formik.touched[name] && formik.errors[name] ? formik.errors[name] : "";
};

export default inputError;
