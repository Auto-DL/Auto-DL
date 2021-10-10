import { useRouter } from "next/router";
import Main from "layouts/Main";
import withAuthentication from "components/WithAuthentication/WithAuthentication";

function Configurations() {
  const router = useRouter();
  const projectName = router.query.projectName;
  return (
    <Main projectName={projectName} activeTab="Configurations">
      CONFIGURATIONS
    </Main>
  );
}

export default withAuthentication(Configurations);
