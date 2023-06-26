import { render, screen } from "@testing-library/react";
import RouteList from ".";

test("renders a heading", () => {
  render(<RouteList />);
  const heading = screen.getByRole("heading", {
    name: /routes/i,
  });
  expect(heading).toBeInTheDocument();
});
