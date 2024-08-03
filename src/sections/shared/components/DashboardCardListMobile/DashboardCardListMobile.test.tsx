import { screen } from "@testing-library/react";
import { renderRouterWithProviders } from "../../../shared/utils/testUtils/testUtils";
import DashboardCardListMobile from "./DashboardCardListMobile";
import { companyTableHeaderSections } from "sections/company/utils/companySections";
import { mockOffers } from "mocks/offersMocks";

describe("Given a DashboardCardListMobile component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a list of customers", () => {
      renderRouterWithProviders(
        <DashboardCardListMobile
          bodySections={mockOffers}
          headerSections={companyTableHeaderSections}
          pageName=""
        />,
      );

      const expectedLabel = screen.getByRole("list");

      expect(expectedLabel).toBeInTheDocument();
    });
  });
});
