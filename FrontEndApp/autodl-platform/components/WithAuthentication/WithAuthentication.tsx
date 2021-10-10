import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const withAuthentication = (Component: any) => {

  const WithAuthentication = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (
        status === "unauthenticated" &&
        !session &&
        router.pathname !== "/"
      ) {
        router.push("/");
      } else if (
        status === "authenticated" &&
        session &&
        router.pathname === "/"
      ) {
        router.push("/home");
      }
    }, [router, session, status]);

    return <Component {...props} />;
  };
  return WithAuthentication;
};

export default withAuthentication;
