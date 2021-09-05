import { render, screen, fireEvent } from "@testing-library/react";
import UpsertProjectModal from "../UpsertProjectModal";

const mockedHandleChange = jest.fn();
const mockedHandleCloseModalSave = jest.fn();
const mockedClasses = jest.fn();
const mockedSetalert = jest.fn();
const mockedSetOpen = jest.fn();
const mockedSetOpenModal = jest.fn();

const createMockData = {
    project_name: "",
    project_description: "",
    data_dir: "",
    language: "python",
    task: "Classification",
    library: "Keras",
    output_file_name: "",
};

const editMockData = {
    project_name: "First Project",
    project_description: "First Description",
    data_dir: "./data",
    language: "python",
    task: "Classification",
    library: "Keras",
    output_file_name: "first.py",
};

const mockedSelectedProject = {
    username: "Tester",
    project_id: "123456789"
}

describe("Create and Edit project modal renders", () => {
    test("should create new project", async () => {
        render(
            <UpsertProjectModal
                handleChange={mockedHandleChange}
                handleCloseModalSave={mockedHandleCloseModalSave}
                classes={mockedClasses}
                values={createMockData}
                openModal={true}
                IsEdit={false}
                setalert={mockedSetalert}
                setOpen={mockedSetOpen}
                setOpenModal={mockedSetOpenModal}
                SelectedProject={mockedSelectedProject}
            />
        );

        const projectNameElement = screen.getByTestId("create-project-input-name");
        let inputElement = projectNameElement.childNodes[1].childNodes[0];
        fireEvent.change(inputElement, { target: { value: "Test Project" } });

        const projectDescElement = screen.getByTestId("create-project-input-desc");
        inputElement = projectDescElement.childNodes[1].childNodes[0];
        fireEvent.change(inputElement, { target: { value: "Test Description" } });

        const projectDatadirElement = screen.getByTestId("create-project-input-datadir");
        inputElement = projectDatadirElement.childNodes[1].childNodes[0];
        fireEvent.change(inputElement, { target: { value: "../data" } });

        const projectOpfileElement = screen.getByTestId("create-project-input-opfile");
        inputElement = projectOpfileElement.childNodes[1].childNodes[0];
        fireEvent.change(inputElement, { target: { value: "test.py" } });

        const btnElement = screen.getByText(/Save Changes/i);
        fireEvent.click(btnElement);

        expect(mockedHandleCloseModalSave).toHaveBeenCalledTimes(1);
    });

    test("should edit existing project", async () => {
        render(
            <UpsertProjectModal
                handleChange={mockedHandleChange}
                handleCloseModalSave={mockedHandleCloseModalSave}
                classes={mockedClasses}
                values={editMockData}
                openModal={true}
                IsEdit={true}
                setalert={mockedSetalert}
                setOpen={mockedSetOpen}
                setOpenModal={mockedSetOpenModal}
                SelectedProject={mockedSelectedProject}
            />
        );

        const projectNameElement = screen.getByTestId("edit-project-input-name");
        let inputElement = projectNameElement.childNodes[1].childNodes[0];
        fireEvent.change(inputElement, { target: { value: "Test Project" } });

        const projectDescElement = screen.getByTestId("edit-project-input-desc");
        inputElement = projectDescElement.childNodes[1].childNodes[0];
        fireEvent.change(inputElement, { target: { value: "Test Description" } });

        const projectDatadirElement = screen.getByTestId("edit-project-input-datadir");
        inputElement = projectDatadirElement.childNodes[1].childNodes[0];
        fireEvent.change(inputElement, { target: { value: "../data" } });

        const projectOpfileElement = screen.getByTestId("edit-project-input-opfile");
        inputElement = projectOpfileElement.childNodes[1].childNodes[0];
        fireEvent.change(inputElement, { target: { value: "test.py" } });

        const btnElement = screen.getByText(/Save Changes/i);
        fireEvent.click(btnElement);

        expect(mockedHandleCloseModalSave).toHaveBeenCalledTimes(1);
    });
});
