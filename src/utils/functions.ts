import { RegisterErrors, RegisterValues } from "./types";

export function isEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

export function validate(values: RegisterValues) {
  const errors: RegisterErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { firstName, lastName, email, password, confirmPassword } = values;

  if (!firstName) errors.firstName = "First name is required";
  else if (firstName.length < 3) errors.firstName = "First name is too short";
  else if (firstName.length > 24) errors.firstName = "First name is too long";

  if (!lastName) errors.lastName = "Last name is required";
  else if (lastName.length < 3) errors.lastName = "Last name is too short";
  else if (lastName.length > 24) errors.lastName = "Last name is too long";

  if (!email) errors.email = "Email address is required";
  else if (!isEmail(email)) errors.email = "Invalid email address";

  if (!password) errors.password = "Password is required";
  else if (password.length < 8) errors.password = "Password is too short";
  else if (password.length > 24) errors.password = "Password is too long";

  if (!confirmPassword) errors.confirmPassword = "Password should be confirmed";
  else if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match";

  return errors;
}
