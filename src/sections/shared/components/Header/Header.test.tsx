import { screen } from "@testing-library/react";
import { renderRouterWithProviders } from "../../utils/testUtils/testUtils";
import Header from "./Header";

describe("Given a Header component", () => {
  describe("When it is rendered", () => {
    test("Then it should show an image with the company logo", () => {
      renderRouterWithProviders(
        <Header pendingOrders={1} pendingCustomers={2} />,
      );

      const expectedImage = screen.getByRole("img");

      expect(expectedImage).toBeInTheDocument();
    });
  });
});
