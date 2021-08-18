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

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Registration Form", () => {
  test("active tab changes to register tab on clicking register tab button", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");
  });

  test("all the fields are initially empty", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const password = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    expect(registerUsername.childNodes[1].childNodes[0].value).toBe("");
    expect(fname.childNodes[1].childNodes[0].value).toBe("");
    expect(lname.childNodes[1].childNodes[0].value).toBe("");
    expect(email.childNodes[1].childNodes[0].value).toBe("");
    expect(password.childNodes[0].value).toBe("");
    expect(confirmPassword.childNodes[0].value).toBe("");
  });

  test("input field values are editable and change as per the value entered by the user", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const password = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "user123" },
    });
    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "John" },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "Doe" },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });

    fireEvent.change(password.childNodes[0], {
      target: { value: "notjohndoe" },
    });

    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoe" },
    });

    expect(registerUsername.childNodes[1].childNodes[0].value).toBe("user123");
    expect(fname.childNodes[1].childNodes[0].value).toBe("John");
    expect(lname.childNodes[1].childNodes[0].value).toBe("Doe");
    expect(email.childNodes[1].childNodes[0].value).toBe("johndoe@gmail.com");
    expect(password.childNodes[0].value).toBe("notjohndoe");
    expect(confirmPassword.childNodes[0].value).toBe("notjohndoe");
  });

  test("register button is clickable and gives warning to fill all details on submitting with empty fields", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    fireEvent.click(registerButton);
    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning to fill all details when the username field is empty and all other fields are filled", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const password = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "john" },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "doe" },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(password.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.click(registerButton);

    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning to fill all details when the fname field is empty and all other fields are filled", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const registerUsername = component.getByTestId("registerUsername");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const password = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "johndoe123" },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "doe" },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(password.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.click(registerButton);

    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });
  test("warning to fill all details when the lname field is empty and all other fields are filled", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const email = component.getByTestId("email");
    const password = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "johndoe123" },
    });
    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "john" },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(password.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.click(registerButton);

    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning to fill all details when the email field is empty and all other fields are filled", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const password = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "johndoe123" },
    });
    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "john" },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "doe" },
    });
    fireEvent.change(password.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.click(registerButton);

    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });
  test("warning to fill all details when the password field is empty and all other fields are filled", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "johndoe123" },
    });
    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "john" },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "doe" },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.click(registerButton);

    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning to fill all details when the confirmPassword field is empty and all other fields are filled", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "johndoe123" },
    });
    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "john" },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "doe" },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.click(registerButton);

    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning to fill all details when password and confirm password fields do not match", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const password = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "johndoe123" },
    });
    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "john" },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "doe" },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(password.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoeeeeeee" },
    });
    fireEvent.click(registerButton);

    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning when the username,firstname or the lastname has blank spaces only", () => {
    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const password = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "    " },
    });
    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "  " },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "    " },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(password.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoe" },
    });

    fireEvent.click(registerButton);
    const warning = component.getByText("Please fill all the details");
    expect(warning).toBeInTheDocument();
  });

  test("warning if username already exists or something goes wrong", async () => {
    server.use(
      rest.post("/auth/register/", (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            message: "Some error occurred",
            token: null,
          })
        );
      })
    );

    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const regPassword = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "johndoe123" },
    });
    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "john" },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "doe" },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(regPassword.childNodes[0], { target: { value: "abc" } });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "abc" },
    });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(component.getByText("Some error occurred")).toBeInTheDocument();
    });
  });

  test("redirect to home page on successful registration", async () => {
    // mock window.location.reload
    window.location = {
      ...window.location,
      reload: jest.fn(),
    };

    const component = render(<LoginForm />);
    const regTab = component.getByText("Register").closest("button");
    expect(regTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(regTab);
    expect(regTab).toHaveAttribute("aria-selected", "true");

    const registerButton = component.getByTestId("registerButton");
    const registerUsername = component.getByTestId("registerUsername");
    const fname = component.getByTestId("fname");
    const lname = component.getByTestId("lname");
    const email = component.getByTestId("email");
    const password = component.getByTestId("registerPassword");
    const confirmPassword = component.getByTestId("confirmPassword");

    fireEvent.change(registerUsername.childNodes[1].childNodes[0], {
      target: { value: "johndoe123" },
    });
    fireEvent.change(fname.childNodes[1].childNodes[0], {
      target: { value: "john" },
    });
    fireEvent.change(lname.childNodes[1].childNodes[0], {
      target: { value: "doe" },
    });
    fireEvent.change(email.childNodes[1].childNodes[0], {
      target: { value: "johndoe@gmail.com" },
    });
    fireEvent.change(password.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.change(confirmPassword.childNodes[0], {
      target: { value: "notjohndoe" },
    });
    fireEvent.click(registerButton);

    await waitFor(() =>
      expect(mockHistoryPush).toHaveBeenLastCalledWith("/home")
    );
  });
});
