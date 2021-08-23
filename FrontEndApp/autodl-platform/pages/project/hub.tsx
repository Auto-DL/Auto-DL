import { useRouter } from "next/router";
import Main from "layouts/Main";

export default function Hub() {
  const router = useRouter();
  const projectName = router.query.projectName;
  return (
    <Main projectName={projectName} activeTab="Hub">
      HUB
    </Main>
  );
}
