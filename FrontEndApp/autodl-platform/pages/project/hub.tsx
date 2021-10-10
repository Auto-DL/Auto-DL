import { useRouter } from "next/router";
import Main from "layouts/Main";
import withAuthentication from "components/WithAuthentication/WithAuthentication";

function Hub() {
  const router = useRouter();
  const projectName = router.query.projectName;
  return (
    <Main projectName={projectName} activeTab="Hub">
      HUB
    </Main>
  );
}

export default withAuthentication(Hub);
