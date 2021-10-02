import { render, screen, fireEvent } from "@testing-library/react";
import { HybridDeployStepThree } from "../HybridDeployment";

const mockedHandleHybridDeployment = jest.fn();
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

describe("Hybrid deployment modal final step renders", () => {
  test("should initiate hybrid deploy", async () => {
    render(
      <HybridDeployStepThree
        values={mockedValues}
        classes={mockedClasses}
        currentPklFile={true}
        handleHybridDeployment={mockedHandleHybridDeployment}
      />
    );

    const btnElement = screen.getByTestId("hybrid-deploy-btn");
    fireEvent.click(btnElement);

    expect(mockedHandleHybridDeployment).toHaveBeenCalledTimes(1);
  });
});
