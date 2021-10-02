import { render, screen, fireEvent } from "@testing-library/react";
import { CloudDeployStepThree } from "../CloudDeployment";

const mockedHandleCloudDeployment = jest.fn();
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

describe("Cloud deployment modal final step renders", () => {
  test("should initiate cloud deploy", async () => {
    render(
      <CloudDeployStepThree
        classes={mockedClasses}
        values={mockedValues}
        currentPklFile={true}
        handleCloudDeployment={mockedHandleCloudDeployment}
      />
    );

    const btnElement = screen.getByTestId("cloud-deploy-btn");
    fireEvent.click(btnElement);

    expect(mockedHandleCloudDeployment).toHaveBeenCalledTimes(1);
  });
});
