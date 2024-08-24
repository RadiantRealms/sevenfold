import { render, screen } from "@testing-library/react";
import { mockUser, withUserProvider } from "../fixtures";
import DashboardPage from "@/app/dashboard/page";
import PortalPage from "@/app/page";

describe("Dashboard", () => {
  // describe("When user is logged in", () => {
  //   it("should render without crashing", async () => {
  //     render(<DashboardPage />, {
  //       wrapper: withUserProvider({ user: mockUser }),
  //     });

  //     expect(screen.getByTestId("dashboard")).toBeInTheDocument();
  //   });
  // });

  describe("When user is not logged in", () => {
    it("Portal should render without crashing", async () => {
      render(<PortalPage />, {
        wrapper: withUserProvider({}),
      });

      expect(screen.getByTestId("portal")).toBeInTheDocument();
    });
  });
});
