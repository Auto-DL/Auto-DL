import Project from '../../../layouts/Project';

type Prop = {
  projectName: string,
}

export default function Deployments({ projectName }: Prop) {
  return  (
    <Project name={projectName}>
      DEPLOYMENTS
    </Project>
  )
}
