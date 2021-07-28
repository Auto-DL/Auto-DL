import { render, waitFor, screen } from "@testing-library/react";
import Homeindex from "../Homeindex";
import { setupServer } from "msw/node";
import { handlers } from "../../../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Read Projects", () => {
    test("should render projects sent from mocks", async () => {
        render(<Homeindex />);

        await waitFor(() => {
            let textElement = screen.getByText(/(First)/);
            expect(textElement).toBeInTheDocument();
            textElement = screen.getByText(/(Second)/);
            expect(textElement).toBeInTheDocument();
            textElement = screen.queryByText(/(eews)/);
            expect(textElement).not.toBeInTheDocument();
        });
    });
});

// describe("Create Projects", () => {
//     test("should create a new project", async () => {
//         render(<Homeindex />);

//         await waitFor(() => {
//             let btnElement = screen.getByTestId("project-save-button");
//             expect(btnElement).toBeInTheDocument();
//         });
//     });
// });