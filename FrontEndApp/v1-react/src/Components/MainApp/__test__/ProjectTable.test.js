import { render, screen  } from "@testing-library/react";
import ProjectTable from "../ProjectTable";

const mockedCloneProject = jest.fn();
const mockedCreateNewProject = jest.fn();
const mockedEditProject = jest.fn();
const mockedHandleStep = jest.fn();
const mockedParentCallOnDelete = jest.fn();

const mockedProjects = [
    {
        "13d6bbfd774b4578af3a300c7cbb31e6": {
            data_dir: "../data",
            lang: "python",
            lib: "Keras",
            output_file_name: "output.py",
            project_description: "first project",
            project_id: "13d6bbfd774b4578af3a300c7cbb31e6",
            project_name: "First",
            task: "Classification",
        }
    },
    {
        "13d6bbfd774b4578af3a300c7cbb31e6": {
            data_dir: "./data",
            lang: "python",
            lib: "Keras",
            output_file_name: "output.py",
            project_description: "second project",
            project_id: "13d6bbfd774b4578af3a300c7cbb31e6",
            project_name: "Second",
            task: "Classification",
        }
    },
];

describe("Project Details Render", () => {
    test("should render correct number of projects", async () => {
        render(
            <ProjectTable
                cloneProject={mockedCloneProject}
                create_new_project={mockedCreateNewProject}
                editProject={mockedEditProject}
                handleStep={mockedHandleStep}
                parent_call_on_delete={mockedParentCallOnDelete}
                projects={mockedProjects}
            />
        );
        const titleElement = screen.getByText("Projects (2)");
        expect(titleElement).toBeInTheDocument();
    });

    test("should render correct project name", async () => {
        render(
            <ProjectTable
                cloneProject={mockedCloneProject}
                create_new_project={mockedCreateNewProject}
                editProject={mockedEditProject}
                handleStep={mockedHandleStep}
                parent_call_on_delete={mockedParentCallOnDelete}
                projects={mockedProjects}
            />
        );
        const textElement = await screen.findByTestId("project-name-1");
        expect(textElement).toBeInTheDocument();
    });

    test("should render correct project language", async () => {
        render(
            <ProjectTable
                cloneProject={mockedCloneProject}
                create_new_project={mockedCreateNewProject}
                editProject={mockedEditProject}
                handleStep={mockedHandleStep}
                parent_call_on_delete={mockedParentCallOnDelete}
                projects={mockedProjects}
            />
        );
        const textElement = await screen.findByTestId("project-lang-1");
        expect(textElement).toBeInTheDocument();
    });

    test("should render correct project library", async () => {
        render(
            <ProjectTable
                cloneProject={mockedCloneProject}
                create_new_project={mockedCreateNewProject}
                editProject={mockedEditProject}
                handleStep={mockedHandleStep}
                parent_call_on_delete={mockedParentCallOnDelete}
                projects={mockedProjects}
            />
        );
        const textElement = await screen.findByTestId("project-lib-1");
        expect(textElement).toBeInTheDocument();
    });

    test("should render correct project data directory", async () => {
        render(
            <ProjectTable
                cloneProject={mockedCloneProject}
                create_new_project={mockedCreateNewProject}
                editProject={mockedEditProject}
                handleStep={mockedHandleStep}
                parent_call_on_delete={mockedParentCallOnDelete}
                projects={mockedProjects}
            />
        );
        const textElement = await screen.findByTestId("project-datadir-1");
        expect(textElement).toBeInTheDocument();
    });

    test("should render correct project task", async () => {
        render(
            <ProjectTable
                cloneProject={mockedCloneProject}
                create_new_project={mockedCreateNewProject}
                editProject={mockedEditProject}
                handleStep={mockedHandleStep}
                parent_call_on_delete={mockedParentCallOnDelete}
                projects={mockedProjects}
            />
        );
        const textElement = await screen.findByTestId("project-task-1");
        expect(textElement).toBeInTheDocument();
    });

    test("should render correct project output file name", async () => {
        render(
            <ProjectTable
                cloneProject={mockedCloneProject}
                create_new_project={mockedCreateNewProject}
                editProject={mockedEditProject}
                handleStep={mockedHandleStep}
                parent_call_on_delete={mockedParentCallOnDelete}
                projects={mockedProjects}
            />
        );
        const textElement = await screen.findByTestId("project-output-1");
        expect(textElement).toBeInTheDocument();
    });

    test("should render correct project description", async () => {
        render(
            <ProjectTable
                cloneProject={mockedCloneProject}
                create_new_project={mockedCreateNewProject}
                editProject={mockedEditProject}
                handleStep={mockedHandleStep}
                parent_call_on_delete={mockedParentCallOnDelete}
                projects={mockedProjects}
            />
        );
        const textElement = await screen.findByTestId("project-description-1");
        expect(textElement).toBeInTheDocument();
    });
});
