import { useRouter } from "next/router";
import Main from "layouts/Main";

export default function ProjectHome() {
  const router = useRouter();
  const projectName = router.query.projectName;
  return (
    <Main projectName={projectName} activeTab="Dashboard">
      DASHBOARD
    </Main>
  );
}
