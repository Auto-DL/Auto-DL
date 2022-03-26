import { GetServerSidePropsContext } from "next";

export default function Index() {
  return "Auto-DL";
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Get the user's session based on the request
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  };
};
