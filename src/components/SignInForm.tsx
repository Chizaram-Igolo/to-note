import { useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import ValidationErrorMessage from "./ValidationErrorMessage";
import {
  LoginValues,
  SetSubmitting,
  loginValidationSchema,
} from "../utils/types";
import { login } from "../utils/api";

import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";

const emptyValues = { email: "", password: "" };

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const initialValues = { ...emptyValues };

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

      setSubmitting(false);
      navigate("/profile", { state: { token } });
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
                  <ValidationErrorMessage message={errors.email} />
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
                  <ValidationErrorMessage message={errors.password} />
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
      </div>
    </div>
  );
}
