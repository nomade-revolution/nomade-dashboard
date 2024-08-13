import { renderRouterWithProviders } from "../../utils/testUtils/testUtils";
import { screen } from "@testing-library/react";
import DashboardTable from "./DashboardTable";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

describe("Given an OrdersTable component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a table of orders", () => {
      renderRouterWithProviders(
        <DashboardTable
          headerSections={[]}
          bodySections={[]}
          pageName={SectionTypes.collabs}
        />,
      );

      const expectedTable = screen.getByRole("table");

      expect(expectedTable).toBeInTheDocument();
    });
  });
});
