import { RegisterErrors, RegisterValues } from "./types";

export function isEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

export function validate(values: RegisterValues) {
  const errors: RegisterErrors = {};

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

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

function formatAMPM(date: Date) {
  var hours: number | string = date.getHours();
  var minutes: number | string = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function formatDate(str: string) {
  let date = new Date(str);

  let day = days[date.getDay()];
  let dateDay = date.getDate();
  let month = date.toLocaleString("en-US", { month: "short" });
  let year = date.getFullYear();

  return `${day}, ${dateDay}${nthNumber(
    dateDay
  )} ${month}, ${year}, ${formatAMPM(date)} `;
}
