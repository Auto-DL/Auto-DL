export type FormValues = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  otp: number;
}

export type ErrorState = {
  username: boolean;
  password: boolean;
  email: boolean;
  firstName: boolean;
  lastName: boolean;
};

export type AuthAPIResponse = {
  message: string;
  status: boolean;
}
