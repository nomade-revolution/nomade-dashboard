import { screen } from "@testing-library/react";
import { renderRouterWithProviders } from "../../../shared/utils/testUtils/testUtils";
import MyAccountPage from "./MyAccountPage";

describe("Given a MyAcconutPage page", () => {
  describe("When it is rendred", () => {
    test("Then it should show a form to show user data", () => {
      renderRouterWithProviders(<MyAccountPage />);

      const expectedForm = screen.getByRole("combobox");

      expect(expectedForm).toBeInTheDocument();
    });
  });
});
