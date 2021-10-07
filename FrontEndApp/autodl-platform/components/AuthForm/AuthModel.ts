export type FormValues = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  otp: number;
}

export type AuthAPIResponse = {
  message: string;
  status: boolean;
  username?: string;
}
