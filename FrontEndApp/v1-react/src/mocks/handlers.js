import { rest } from "msw";
import { getMockProjects } from "./resolvers/readProjectsResolver";
import { createMockProject } from "./resolvers/createProjectsResolver";

const handlers = [
    rest.post("http://localhost/v1/projects/all/", getMockProjects),
    rest.post("http://localhost/v1/project/new/", createMockProject),
];  

export { handlers, rest };