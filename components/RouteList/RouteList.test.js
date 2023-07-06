import { render, screen } from "@testing-library/react";
import RouteList from "./index.js";
import { routesData } from "@/routesData.js";

test("renders a heading", () => {
  render(<RouteList routesData={routesData} />);
  const heading = screen.getByRole("heading", {
    name: /lamo/i,
  });
  expect(heading).toBeInTheDocument();
});
