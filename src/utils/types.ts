export type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterErrors = { [K in keyof RegisterValues]?: string };

export type SetSubmitting = (isSubmitting: boolean) => void;
