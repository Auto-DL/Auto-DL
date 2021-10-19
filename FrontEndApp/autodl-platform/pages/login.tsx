import React from "react";
import Auth from "layouts/Auth";
import AuthForm from "components/AuthForm/AuthForm";
import { GetServerSidePropsContext } from "next";

export default function Login() {
  return (
    <Auth>
      <AuthForm />
    </Auth>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Get the user's session based on the request
  const { req } = context;
  const token = req.cookies.token;

  if (token) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
