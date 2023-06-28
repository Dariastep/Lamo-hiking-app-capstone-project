import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteButton from ".";

test("renders a button", () => {
  render(<FavoriteButton />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
