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

export type FileData = {
  title: string;
  files: string[] | ArrayBuffer[];
};

export type Participant = {
  document_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  role: string;
};

export type EmailInviteData = {
  message: string;
  files: string[] | ArrayBuffer[];
  participants: Participant[];
};

export type Token = {
  token?: string;
  token_type?: string;
};

export type RegisterErrors = { [K in keyof RegisterValues]?: string };

export type SetSubmitting = (isSubmitting: boolean) => void;

export type UserType = {
  access_locker_documents: boolean;
  address?: string | null;
  avatar?: string | null;
  bvn?: number | string | null;
  city?: string | null;
  country?: string | null;
  created_at: string | null;
  dob?: string | null;
  drivers_license_no: string | null;
  email: string;
  first_name: string;
  gender?: string;
  id: string;
  identity_number?: string | null;
  identity_type?: string | null;
  image: string;
  initials: string;
  ip_address: string;
  is_complete?: boolean | null;
  is_online: boolean;
  last_name: string;
  national_verification: boolean;
  nin?: string | number | null;
  permissions: string[];
  phone?: string | null;
  role: string[];
  state?: string | null;
  system_verification: boolean;
  updated_at: string;
};

export type DocumentType = {
  id: string;
  title: string;
  status: string;
  participants_count: number;
  parent_id: string | number | null;
  is_the_owner_of_document: boolean;
  documentUploads?: Object[];
  document_owner: string;
  seals_count: number;
  tools_count: number;
  uploads_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_a_signlink_docs: boolean;
  public: boolean;
  is_a_template: boolean;
  entry_point: string;
  completed_file_request: boolean | null;
  all_participants_has_signed: boolean;
  signed_signatures: number | boolean | null;
  participants?: Object[];
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
