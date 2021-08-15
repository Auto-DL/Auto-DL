import { rest } from "msw";
import { getMockProjects, createMockProject, editMockProject, deleteMockProject } from "./resolvers";

const handlers = [
    rest.post("http://localhost/v1/projects/all/", getMockProjects),
    rest.post("http://localhost/v1/project/new/", createMockProject),
    rest.post("http://localhost/v1/project/edit/", editMockProject),
    rest.post("http://localhost/v1/project/delete/", deleteMockProject),
];

export { handlers, rest };
