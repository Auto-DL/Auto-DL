import Project from '../../../layouts/Project';

type Prop = {
  projectName: string,
}

export default function Hub({ projectName }: Prop) {
  return  (
    <Project name={projectName}>
      HUB
    </Project>
  )
}
