import { Formik } from "formik";
import axios from "axios";
import ValidationErrorMessage from "./ValidationErrorMessage";
import { RegisterErrors, RegisterValues, SetSubmitting } from "../utils/types";
import { isEmail, validate } from "../utils/functions";

const emptyValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const initialValues = { ...emptyValues };

  const onSubmit = (
    values: RegisterValues,
    { setSubmitting }: { setSubmitting: SetSubmitting }
  ) => {
    console.log("dsf");
    setTimeout(() => {
      console.log("d");
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        // validate={validate}
        // onSubmit={onSubmit}
        validate={(values: RegisterValues) => {
          const errors: RegisterErrors = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          };

          const { firstName, lastName, email, password, confirmPassword } =
            values;

          if (!firstName) errors.firstName = "First name is required";
          else if (firstName.length < 3)
            errors.firstName = "First name is too short";
          else if (firstName.length > 24)
            errors.firstName = "First name is too long";

          if (!lastName) errors.lastName = "Last name is required";
          else if (lastName.length < 3)
            errors.lastName = "Last name is too short";
          else if (lastName.length > 24)
            errors.lastName = "Last name is too long";

          if (!email) errors.email = "Email address is required";
          else if (!isEmail(email)) errors.email = "Invalid email address";

          if (!password) errors.password = "Password is required";
          else if (password.length < 8)
            errors.password = "Password is too short";
          else if (password.length > 24)
            errors.password = "Password is too long";

          if (!confirmPassword)
            errors.confirmPassword = "Password should be confirmed";
          else if (password !== confirmPassword)
            errors.confirmPassword = "Passwords do not match";

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            className="w-1/3 p-6 bg-white rounded shadow-md"
            onSubmit={handleSubmit}
          >
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
                <ValidationErrorMessage message={errors.firstName} />
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
                <ValidationErrorMessage message={errors.lastName} />
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
                <ValidationErrorMessage message={errors.confirmPassword} />
              )}
            </div>

            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
