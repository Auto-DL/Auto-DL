import React from "react";
import Auth from "layouts/Auth";
import AuthForm from "components/AuthForm/AuthForm";

export default function Home() {
  return (
    <Auth>
      <AuthForm />
    </Auth>
  );
}
