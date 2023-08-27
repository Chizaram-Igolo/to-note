import { Formik } from "formik";
import {
  RegisterValues,
  SetSubmitting,
  regValidationSchema,
} from "../../utils/types";
import { register } from "../../utils/api";

import { Link, useNavigate } from "react-router-dom";

const emptyValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const navigate = useNavigate();
  const initialValues = { ...emptyValues };

  async function onSubmit(
    values: RegisterValues,
    { setSubmitting }: { setSubmitting: SetSubmitting }
  ) {
    const {
      firstName: first_name,
      lastName: last_name,
      email,
      password,
    } = values;
    const role = "User";

    register({ first_name, last_name, email, password, role })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });

    setSubmitting(false);
    navigate("/register-success", { state: { first_name, last_name, email } });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={regValidationSchema}
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
              <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
              <div className="mb-4">
                <label htmlFor="firstName" className="block font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full border rounded p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                {errors.firstName && touched.firstName && (
                  <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="block font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full border rounded p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                {errors.lastName && touched.lastName && (
                  <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                    {errors.lastName}
                  </span>
                )}
              </div>

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

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block font-medium mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full border rounded p-2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-red-100 px-[0.65em] pb-[0.5em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700">
                    {errors.confirmPassword}
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
                Sign Up
              </button>
            </form>
          )}
        </Formik>

        <div className="mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-800">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
