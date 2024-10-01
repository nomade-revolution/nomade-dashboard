import { screen } from "@testing-library/react";
import DropdownMenu from "./DropdownMenu";
import { renderRouterWithProviders } from "../../../../utils/testUtils/testUtils";
import { vi } from "vitest";
import { mockOffers } from "mocks/offersMocks";
import { mockUsers } from "mocks/userMocks";

const mockedHandleFunction = vi.fn();

describe("Given a DropdownMenu component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a list of user actions", () => {
      const ordersText = "Clientes";

      renderRouterWithProviders(
        <DropdownMenu
          handleLogout={mockedHandleFunction}
          handleMenuState={mockedHandleFunction}
          badgeCountCompanies={1}
          badgeCountInfluencers={1}
          badgeCountUsers={1}
          offer={mockOffers[0]}
          user={mockUsers[1]}
        />,
      );

      const expectedList = screen.getByRole("list");
      const expectedOrderText = screen.getByText(ordersText);

      expect(expectedList).toBeInTheDocument();
      expect(expectedOrderText).toBeInTheDocument();
    });
  });
});
