import { fireEvent, render, screen  } from "@testing-library/react";
import ProjectTable from "../ProjectTable";

const mockedParentCallOnDelete = jest.fn();
const mockedHandleDeleteYes = jest.fn();

const mockProjects = [
    { "13d6bbfd774b4578af3a300c7cbb31e6": { data_dir: "../data", lang: "python", lib: "Keras", output_file_name: "output.py", project_description: "first project", project_id: "13d6bbfd774b4578af3a300c7cbb31e6", project_name: "First", task: "Classification" } },
    { "13d6bbfd774b4578af3a300c7cbb31e6": { data_dir: "./data", lang: "python", lib: "Keras", output_file_name: "output.py", project_description: "second project", project_id: "13d6bbfd774b4578af3a300c7cbb31e6", project_name: "Second", task: "Classification" } },
];

describe("Project Details Render", () => {
    test("should render correct number of projects", async () => {
        render(
            <ProjectTable
                projects={mockProjects}
            />
        );
        const titleElement = screen.getByText("Projects (2)");
        expect(titleElement).toBeInTheDocument();
    });

    test("should render correct project details", async () => {
        render(
            <ProjectTable
                projects={mockProjects}
            />
        );

        let textElement = await screen.findByTestId("project-name-1");
        expect(textElement).toBeInTheDocument();
        textElement = await screen.findByTestId("project-lang-1");
        expect(textElement).toBeInTheDocument();
        textElement = await screen.findByTestId("project-lib-1");
        expect(textElement).toBeInTheDocument();
        textElement = await screen.findByTestId("project-datadir-1");
        expect(textElement).toBeInTheDocument();
        textElement = await screen.findByTestId("project-task-1");
        expect(textElement).toBeInTheDocument();
        textElement = await screen.findByTestId("project-output-1");
        expect(textElement).toBeInTheDocument();
        textElement = await screen.findByTestId("project-description-1");
        expect(textElement).toBeInTheDocument();
    });

    test("should delete existing project", async () => {
        render(
            <ProjectTable
                handleDeleteYes={mockedHandleDeleteYes}
                parent_call_on_delete={mockedParentCallOnDelete}
                projects={mockProjects}
            />
        );
        const actionsButtonElement = screen.getByTestId("project-actions-btn-1");
        fireEvent.click(actionsButtonElement);
        const deleteButtonElement = screen.getByTestId("delete-project-btn-1");
        fireEvent.click(deleteButtonElement);
        const textElement = screen.getByText(/Yes/i);
        fireEvent.click(textElement);
        expect(mockedHandleDeleteYes).toHaveBeenCalledTimes(1);
    });
});
