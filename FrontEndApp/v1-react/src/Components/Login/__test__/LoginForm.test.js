import { fireEvent, render, waitFor } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { React } from "react";
import { setupServer } from "msw/node";
import { handlers, rest } from "../../../mocks/handlers.js";

const server = setupServer(...handlers);

// mock window location
const mockWinAssign = jest.fn();
const oldWindowLocation = window.location;

beforeAll(() => {
  delete window.location;
  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        value: mockWinAssign,
      },
    }
  );
  server.listen();
});

afterAll(() => {
  // restore location
  window.location = oldWindowLocation;
  server.close();
});

afterEach(() => {
  jest.clearAllMocks();
  server.resetHandlers();
});

// mock history push
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Login Form", () => {
  test("username field should be in the document", () => {
    const component = render(<LoginForm />);
    const usernameField = component.getByTestId("loginUsername");
    expect(usernameField).toBeInTheDocument();
  });

  test("password field should be in the document", () => {
    const component = render(<LoginForm />);
    const passwordField = component.getByTestId("loginPassword");

    expect(passwordField).toBeInTheDocument();
  });

  test("username and password fields are initially empty ", () => {
    const component = render(<LoginForm />);
    const loginUsername = component.getByTestId("loginUsername");
    const loginPasswordField = component.getByTestId("loginPassword");

    const enteredUsername = loginUsername.childNodes[1].childNodes[0].value;
    const enteredPassword = loginPasswordField.childNodes[0].value;

    expect(enteredUsername).toBe("");
    expect(enteredPassword).toBe("");
  });

  test("email field should accept text and its value should change", () => {
    const component = render(<LoginForm />);
    const loginUsername = component.getByTestId("loginUsername");
    fireEvent.change(loginUsername.childNodes[1].childNodes[0], {
      target: { value: "user23234" },
    });
    expect(loginUsername.childNodes[1].childNodes[0].value).toBe("user23234");
  });

  test("password field should accept text and its value should change", () => {
    const component = render(<LoginForm />);
    const loginPasswordField = component.getByTestId("loginPassword");

    fireEvent.change(loginPasswordField.childNodes[0], {
      target: { value: "aosd3e4" },
    });
    expect(loginPasswordField.childNodes[0].value).toBe("aosd3e4");
  });

  test("submit button must be clickable", () => {
    const component = render(<LoginForm />);
    const loginButton = component.getByTestId("loginButton");

    fireEvent.click(loginButton);
    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning to fill all the details when username and password are both empty", () => {
    const component = render(<LoginForm />);
    const loginButton = component.getByTestId("loginButton");

    fireEvent.click(loginButton);
    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning to fill all the details when username is filled but password is empty", () => {
    const component = render(<LoginForm />);
    const loginButton = component.getByTestId("loginButton");
    const loginUsername = component.getByTestId("loginUsername");

    fireEvent.change(loginUsername.childNodes[1].childNodes[0], {
      target: { value: "user23234" },
    });
    fireEvent.click(loginButton);
    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning to fill all the details when password is filled but username is empty", () => {
    const component = render(<LoginForm />);
    const loginButton = component.getByTestId("loginButton");
    const loginPasswordField = component.getByTestId("loginPassword");

    fireEvent.change(loginPasswordField.childNodes[0], {
      target: { value: "aosd3e4" },
    });
    fireEvent.click(loginButton);

    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("invalid credentials warning on submitting invalid info details", async () => {
    server.use(
      rest.post("/auth/login/", (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            message: "Invalid credentials",
            token: null,
          })
        );
      })
    );

    const component = render(<LoginForm />);
    const loginButton = component.getByTestId("loginButton");
    const loginUsername = component.getByTestId("loginUsername");
    const loginPasswordField = component.getByTestId("loginPassword");

    fireEvent.change(loginUsername.childNodes[1].childNodes[0], {
      target: { value: "user23234" },
    });
    fireEvent.change(loginPasswordField.childNodes[0], {
      target: { value: "aosd3e4" },
    });

    fireEvent.click(loginButton);
    await waitFor(() =>
      expect(component.getByText("Invalid credentials")).toBeInTheDocument()
    );
  });

  test("redirect to home on successful login", async () => {
    // mock window.location.reload
    window.location = {
      ...window.location,
      reload: jest.fn(),
    };
    const component = render(<LoginForm />);
    const loginButton = component.getByTestId("loginButton");
    const loginUsername = component.getByTestId("loginUsername");
    const loginPasswordField = component.getByTestId("loginPassword");
    fireEvent.change(loginUsername.childNodes[1].childNodes[0], {
      target: { value: "user23234" },
    });
    fireEvent.change(loginPasswordField.childNodes[0], {
      target: { value: "aosd3e4" },
    });

    fireEvent.click(loginButton);
    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenLastCalledWith("/home")
    );
  });
});
