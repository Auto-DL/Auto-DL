import { render, waitFor, screen } from "@testing-library/react";
import Home from "../Homeindex";
import { setupServer } from "msw/node";
import { handlers } from "../../../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Read Projects", () => {
    test("should render projects sent from mocks", async () => {
        render(<Home />);

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
