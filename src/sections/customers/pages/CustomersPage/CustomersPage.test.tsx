import { screen } from "@testing-library/react";
import { renderRouterWithProviders } from "../../../shared/utils/testUtils/testUtils";
import CustomersPage from "./CustomersPage";

describe("Given a CustomersPage component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a table of customers", () => {
      renderRouterWithProviders(<CustomersPage />);

      const expectedLabel = screen.getByLabelText("dashboard table");

      expect(expectedLabel).toBeInTheDocument();
    });
  });
});
