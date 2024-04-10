import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import DashboardCardMobile from "./DashboardCardMobile";
import { mockClients } from "../../../../mocks/clientsMocks";
import { customersHeaderSections } from "../../../customers/utils/customersSections";
import { renderRouterWithProviders } from "../../utils/testUtils/testUtils";

describe("Given an DashboardCardMobile component", () => {
  describe("When it is rendered", () => {
    test("Then it should show the text state `Restaurante La Parrilla`", () => {
      const text = "Restaurante La Parrilla";

      renderRouterWithProviders(
        <DashboardCardMobile
          bodySection={mockClients[0]}
          headerSections={customersHeaderSections}
        />,
      );

      const expectedText = screen.getByText(text);

      expect(expectedText).toBeInTheDocument();
    });
  });
});
