import { render, screen } from "@testing-library/react";
import NavigationBar from ".";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
  }));

test("renders a link", () => {
    useRouter.mockImplementation(() => ({
        pathname: "/",
      }));
  render(<NavigationBar />);
  const link = screen.getByRole("link");
  expect(link).toBeInTheDocument();
});
