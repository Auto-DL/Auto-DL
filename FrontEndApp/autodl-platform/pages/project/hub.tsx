import { useRouter } from "next/router";
import Main from "layouts/Main";
import { GetServerSidePropsContext } from "next";

export default function Hub() {
  const router = useRouter();
  const projectName = router.query.projectName;
  return (
    <Main projectName={projectName} activeTab="Hub">
      HUB
    </Main>
  );
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
    props: {},
  };
};
