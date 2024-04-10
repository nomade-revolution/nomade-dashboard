import { screen } from "@testing-library/react";
import { renderRouterWithProviders } from "../../../shared/utils/testUtils/testUtils";
import OffersPage from "./OffersPage";

describe("Given a OffersPage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a table of customers", () => {
      renderRouterWithProviders(<OffersPage />);

      const expectedLabel = screen.getByLabelText("dashboard table");

      expect(expectedLabel).toBeInTheDocument();
    });
  });
});
