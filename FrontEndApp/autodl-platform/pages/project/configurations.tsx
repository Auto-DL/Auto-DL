import { useRouter } from "next/router";
import Main from "layouts/Main";

export default function Deployments() {
  const router = useRouter();
  const projectName = router.query.projectName;
  return (
    <Main projectName={projectName} activeTab="Configurations">
      CONFIGURATIONS
    </Main>
  );
}
