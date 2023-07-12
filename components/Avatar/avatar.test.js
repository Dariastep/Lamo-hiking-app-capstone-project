import { render, screen } from "@testing-library/react";
import Avatar from "./";


test("alt contains correct value", () => {
  render(<Avatar />);
  const testImage = screen.getByAltText("Default avatar");


  expect(testImage).toBeInTheDocument();
});