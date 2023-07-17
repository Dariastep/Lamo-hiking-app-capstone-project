import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

describe("Profile", () => {
  it("renders a name", () => {
    const userProfile = {
      name: "John Doe",
      
    };

    render(<Profile userProfile={userProfile} />);

    const nameElement = screen.getByText("John Doe");
    expect(nameElement).toBeInTheDocument();
  });
});
