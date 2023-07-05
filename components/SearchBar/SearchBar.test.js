import { render, screen } from "@testing-library/react";
import SearchBar from ".";

test("renders search input field", () => {
  const searchResults = []; 
  render(<SearchBar searchQuery="" handleSearch={() => {}} searchResults={searchResults} />);
  const inputElement = screen.getByRole("textbox", { name: "search field" });
  expect(inputElement).toBeInTheDocument();
});