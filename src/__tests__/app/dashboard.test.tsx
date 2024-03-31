import { render, screen } from "@testing-library/react";
import Dashboard from "../../app/dashboard/page";
import { mockUser, withUserProvider } from "../fixtures";

describe("Dashboard", () => {
  describe("When user is logged in", () => {
    it("should render without crashing", async () => {
      render(<Dashboard />, { wrapper: withUserProvider({ user: mockUser }) });

      expect(screen.getByTestId("dashboard")).toBeInTheDocument();
      expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
    });
  });
});
