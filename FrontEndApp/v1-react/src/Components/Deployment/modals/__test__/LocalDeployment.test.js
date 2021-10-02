import { render, screen, fireEvent } from "@testing-library/react";
import { LocalDeployStepThree } from "../LocalDeployment";

const mockedClasses = jest.fn();
const mockedHandleLocalDeployment = jest.fn();

describe("Local deployment modal final step renders", () => {
  test("should initiate local deploy", async () => {
    render(
      <LocalDeployStepThree
        classes={mockedClasses}
        handleLocalDeployment={mockedHandleLocalDeployment}
      />
    );

    const btnElement = screen.getByText(/Initiate Deployment/i);
    fireEvent.click(btnElement);

    expect(mockedHandleLocalDeployment).toHaveBeenCalledTimes(1);
  });
});
