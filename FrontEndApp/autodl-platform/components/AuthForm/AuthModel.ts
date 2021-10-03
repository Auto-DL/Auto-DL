export type UserState = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: "user" | "organization";
  otp: string;
};

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
