import { useRouter } from "next/router";
import Main from "layouts/Main";
import withAuthentication from "components/WithAuthentication/WithAuthentication";

function Deployments() {
  const router = useRouter();
  const projectName = router.query.projectName;
  return (
    <Main projectName={projectName} activeTab="Deployments">
      DEPLOYMENTS
    </Main>
  );
}

export default withAuthentication(Deployments);
