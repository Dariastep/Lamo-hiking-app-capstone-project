
import { render, screen } from "@testing-library/react";
import FavoritePage from ".";
import RouteList from "../RouteList";
import RouteCard from "../RouteCard";
import SearchBar from "../SearchBar";

test("renders a search field", () => {

  render(<FavoritePage />);
  const searchField = screen.getByRole("textbox", { name: "search field" }
  );
  expect(searchField).toBeInTheDocument();
});
