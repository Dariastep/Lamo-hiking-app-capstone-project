import { render, screen } from "@testing-library/react";
import RouteCard from ".";

const route = {
  id: 1,
  name: "The Five Lakes Trail to Fernsteinsee",
  imageUrl:
    "https://images.unsplash.com/photo-1662848732896-7b583983f997?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
  activity: "Hiking",
  difficulty: "Moderate",
  length: "10 km",
  altitude: "500 m",
};

test("renders a route name", () => {
  render(<RouteCard route={route} />);
  const heading = screen.getByRole("heading", {
    name: /the five lakes trail to fernsteinsee/i,
  });
  expect(heading).toBeInTheDocument();
});
