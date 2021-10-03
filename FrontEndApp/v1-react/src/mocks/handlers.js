import { rest } from "msw";
import { getMockProjects, createMockProject, editMockProject, deleteMockProject, cloneMockProject, getLoginResolver, getRegistrationResolver } from "./resolvers";

const baseUrl = "http://localhost";

const handlers = [
    rest.post(`${baseUrl}/v1/projects/all/`, getMockProjects),
    rest.post(`${baseUrl}/v1/project/new/`, createMockProject),
    rest.post(`${baseUrl}/v1/project/new/`, createMockProject),
    rest.post(`${baseUrl}/v1/project/edit/`, editMockProject),
    rest.post(`${baseUrl}/v1/project/delete/`, deleteMockProject),
    rest.post(`${baseUrl}/v1/project/clone/`, cloneMockProject),
    rest.post(`${baseUrl}/auth/login/`, getLoginResolver),
    rest.post(`${baseUrl}/auth/register/`, getRegistrationResolver),
];

export { handlers, rest };
