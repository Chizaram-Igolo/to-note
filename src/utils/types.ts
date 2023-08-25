import { object, string, ref } from "yup";

export type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValuesPrepared = {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  password: string;
};

export type LoginValuesPrepared = {
  email: string;
  password: string;
  entry_point: string;
};

export type Token = {
  token?: string;
  token_type?: string;
};

export type RegisterErrors = { [K in keyof RegisterValues]?: string };

export type SetSubmitting = (isSubmitting: boolean) => void;

export type User = {
  access_locker_documents: boolean;
  address?: string;
  avatar?: string;
  bvn?: number;
  city?: string;
  country?: string;
  created_at: string;
  dob?: string;
  drivers_license_no: string;
  email: string;
  first_name: string;
  gender?: string;
  id: string;
  identity_number?: string;
  identity_type?: string;
  image: string;
  initials: string;
  ip_address: string;
  is_complete?: boolean;
  is_online: boolean;
  last_name: string;
  national_verification: boolean;
  nin?: string;
  permissions: string[];
  phone?: string;
  role: string[];
  state?: string;
  system_verification: boolean;
  updated_at: string;
};

export const regValidationSchema = object({
  firstName: string().required().min(3).max(24).label("First name"),
  lastName: string().required().min(3).max(24).label("Last name"),
  email: string().email().required().label("Email"),
  password: string().required().min(8).max(24).label("Password"),
  confirmPassword: string()
    .required()
    .oneOf([ref("password")], "Passwords must match")
    .label("Confirm Password"),
});

export const loginValidationSchema = object({
  email: string().email().required().label("Email"),
  password: string().required().min(8).max(24).label("Password"),
});
