import { screen } from "@testing-library/react";
import { renderRouterWithProviders } from "../../utils/testUtils/testUtils";
import SideBar from "./SideBar";
import { mockOffers } from "mocks/offersMocks";
import { mockUsers } from "mocks/userMocks";

describe("Given a SideBar component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a section with user actions", () => {
      renderRouterWithProviders(
        <SideBar
          badgeUsers={1}
          badgeInfluencers={1}
          badgeCompanies={1}
          badgeLeads={1}
          offer={mockOffers[0]}
          user={mockUsers[1]}
          isMinimized={false}
          setIsMinimized={() => {}}
        />,
      );

      const sectionName = screen.getByText("Clientes");

      expect(sectionName).toBeInTheDocument();
    });
  });
});
