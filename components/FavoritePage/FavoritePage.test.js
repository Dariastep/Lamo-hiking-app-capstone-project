
import { render, screen } from "@testing-library/react";
import FavoritePage from ".";


test("renders a search field", () => {

  render(<FavoritePage />);
  const searchField = screen.getByRole("textbox", { name: "search field" }
  );
  expect(searchField).toBeInTheDocument();
});
