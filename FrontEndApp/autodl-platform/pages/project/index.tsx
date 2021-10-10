import { useRouter } from "next/router";
import Main from "layouts/Main";
import withAuthentication from "components/WithAuthentication/WithAuthentication";

function ProjectHome() {
  const router = useRouter();
  const projectName = router.query.projectName;
  return (
    <Main projectName={projectName} activeTab="Dashboard">
      DASHBOARD
    </Main>
  );
}

export default withAuthentication(ProjectHome)
