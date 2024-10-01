import { screen } from "@testing-library/react";
import DropdownMenu from "./DropdownMenu";
import { renderRouterWithProviders } from "../../../../utils/testUtils/testUtils";
import { vi } from "vitest";

const mockedHandleFunction = vi.fn();

describe("Given a DropdownMenu component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a list of user actions", () => {
      const ordersText = "Clientes";

      renderRouterWithProviders(
        <DropdownMenu
          handleLogout={mockedHandleFunction}
          handleMenuState={mockedHandleFunction}
          badgeCountUsers={1}
          pendingCustomers={2}
        />,
      );

      const expectedList = screen.getByRole("list");
      const expectedOrderText = screen.getByText(ordersText);

      expect(expectedList).toBeInTheDocument();
      expect(expectedOrderText).toBeInTheDocument();
    });
  });
});
