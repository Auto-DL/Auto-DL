import React from "react";
import Auth from "layouts/Auth";
import AuthForm from "components/AuthForm/AuthForm";
import withAuthentication from "components/WithAuthentication/WithAuthentication";

function Home() {
  return (
    <Auth>
      <AuthForm />
    </Auth>
  );
}

export default withAuthentication(Home);
