import { render, screen, fireEvent } from "@testing-library/react";
import CloneProjectModal from "../CloneProjectModal";

const mockedHandleSaveClone = jest.fn();
const mockedHandleChange = jest.fn();
const mockedClasses = jest.fn();

const mockedValues = {
  project_name: "First Project",
  project_description: "First Description",
  data_dir: "./data",
  language: "python",
  task: "Classification",
  library: "Keras",
  output_file_name: "first.py",
};

let mockedCloneStep = 0;
let mockedModelLayers = false;
let mockedPreprocessingParameters = false;
let mockedHyperParameters = false;

const incrementCloneStep = (step) => {
  mockedCloneStep = step;
}

const handleToggle = () => {
  mockedModelLayers = true;
}

describe("Clone project modal renders", () => {
  test("should clone new project", async () => {
    // Render Step 1 of the Clone Modal
    const { rerender } = render(
      <CloneProjectModal
        cloneStep={mockedCloneStep}
        setCloneStep={incrementCloneStep}
        values={mockedValues}
        handleChange={mockedHandleChange}
        openCloneModal={true}
        classes={mockedClasses}
      />
    );

    const btnElementProceed = screen.getByText(/Proceed/i);
    fireEvent.click(btnElementProceed);

    // Render Step 2 of the Clone Modal
    rerender(
      <CloneProjectModal
        cloneStep={mockedCloneStep}
        modelLayers={mockedModelLayers}
        preprocessingParameters={mockedPreprocessingParameters}
        hyperParameters={mockedHyperParameters}
        openCloneModal={true}
        classes={mockedClasses}
        handleCloneChange={handleToggle}
        handleSaveClone={mockedHandleSaveClone}
      />
    );

    const checkboxElement = screen.getByText(/Model Layers/i);
    fireEvent.click(checkboxElement);

    // Render Step 2 after Selecting Clone Option
    rerender(
      <CloneProjectModal
        cloneStep={1}
        modelLayers={mockedModelLayers}
        preprocessingParameters={mockedPreprocessingParameters}
        hyperParameters={mockedHyperParameters}
        openCloneModal={true}
        classes={mockedClasses}
        handleCloneChange={handleToggle}
        handleSaveClone={mockedHandleSaveClone}
      />
    );

    const btnElementCreate = screen.getByText(/Create Clone/i);
    fireEvent.click(btnElementCreate);

    expect(mockedHandleSaveClone).toHaveBeenCalledTimes(1);
  });
});
