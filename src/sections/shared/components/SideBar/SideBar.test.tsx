import { screen } from "@testing-library/react";
import { renderRouterWithProviders } from "../../utils/testUtils/testUtils";
import SideBar from "./SideBar";

describe("Given a SideBar component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a section with user actions", () => {
      renderRouterWithProviders(
        <SideBar pendingOrders={1} pendingCustomers={1} />,
      );

      const sectionName = screen.getByText("Clientes");

      expect(sectionName).toBeInTheDocument();
    });
  });
});
