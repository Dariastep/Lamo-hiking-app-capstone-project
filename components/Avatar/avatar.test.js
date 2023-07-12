import { render, screen } from "@testing-library/react";
import Avatar from ".";


test("renders an image, () => {

  render(<Avatar />);
  const searchField = screen.getByRole("textbox", { name: "search field" }
  );
  expect(searchField).toBeInTheDocument();
});
