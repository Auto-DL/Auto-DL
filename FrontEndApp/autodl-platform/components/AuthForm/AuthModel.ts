export type FormValues = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  otp: string;
};

export type AuthAPI = {
  // request params
  username?: string;
  password?: string;
  user?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  received_otp?: string;
  // response params
  message?: string;
  status?: boolean;
  token?: string;
};
