import { useEffect, useState } from "react";
import { Formik } from "formik";
import Cookies from "universal-cookie";
import axios from "axios";
import {
  LoginValues,
  SetSubmitting,
  loginValidationSchema,
} from "../../utils/types";
import { login } from "../../utils/api";

import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";

const emptyValues = { email: "", password: "" };

export default function SignIn() {
  const cookies = new Cookies();

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const initialValues = { ...emptyValues };

  // useEffect(() => {
  //   const token = cookies.get("to-note-token");

  //   if (token) {
  //     navigate("/dashboard", { state: { token } });
  //   }
  // }, []);

  async function onSubmit(
    values: LoginValues,
    { setSubmitting }: { setSubmitting: SetSubmitting }
  ) {
    const { email, password } = values;
    const entry_point = "User";

    try {
      const token = await login({ email, password, entry_point }).then(
        (res) => res.data
      );

      console.log(token);

      cookies.set("to-note-token", token.token);

      setSubmitting(false);
      navigate("/dashboard/upload-document", { state: { token } });
    } catch (err) {
      if (axios.isAxiosError(err))
        setErrorMessage(
          `An error occured while attempting to login: ${err.message}`
        );
      else if (err instanceof Error) setErrorMessage(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            dirty,
            isValid,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              {errorMessage && (
                <AlertMessage type="error" message={errorMessage} />
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full border rounded p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full border rounded p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                    {errors.password}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={`w-full ${
                  !isValid || !dirty || isSubmitting
                    ? "bg-gray-500"
                    : "bg-blue-500"
                } text-white py-2 rounded ${
                  !isValid || !dirty || isSubmitting
                    ? "hover:bg-gray-600"
                    : "hover:bg-blue-600"
                } `}
                disabled={!isValid || !dirty || isSubmitting}
              >
                Login
              </button>
            </form>
          )}
        </Formik>

        <div className="mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-800">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
