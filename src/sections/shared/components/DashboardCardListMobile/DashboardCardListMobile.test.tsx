import { screen } from "@testing-library/react";
import { renderRouterWithProviders } from "../../../shared/utils/testUtils/testUtils";
import DashboardCardListMobile from "./DashboardCardListMobile";
import { mockClients } from "../../../../mocks/clientsMocks";
import { customersHeaderSections } from "../../../customers/utils/customersSections";

describe("Given a DashboardCardListMobile component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a list of customers", () => {
      renderRouterWithProviders(
        <DashboardCardListMobile
          bodySections={mockClients}
          headerSections={customersHeaderSections}
        />,
      );

      const expectedLabel = screen.getByRole("list");

      expect(expectedLabel).toBeInTheDocument();
    });
  });
});
