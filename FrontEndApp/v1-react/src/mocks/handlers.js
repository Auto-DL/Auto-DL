import { rest } from "msw";
import { getMockProjects } from "./resolvers/readProjectsResolver";
import { createMockProject } from "./resolvers/createProjectsResolver";
import { getLoginResolver } from "./resolvers/authResolvers";
import { getRegistrationResolver } from "./resolvers/authResolvers";

const handlers = [
  rest.post("http://localhost/v1/projects/all/", getMockProjects),
  rest.post("http://localhost/v1/project/new/", createMockProject),
  rest.post("http://localhost/auth/login/", getLoginResolver),
  rest.post("http://localhost/auth/register/", getRegistrationResolver),
];

export { handlers, rest };
