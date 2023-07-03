
import { render, screen } from "@testing-library/react";
import FavoritePage from ".";

test("renders a heading", () => {
  render(<FavoritePage />);
  const heading = screen.getByRole("heading", {
    name: /favorites/i,
  });
  expect(heading).toBeInTheDocument();
});
