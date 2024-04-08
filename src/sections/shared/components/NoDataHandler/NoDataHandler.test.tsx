import { screen } from "@testing-library/react";
import NoDataHandler from "./NoDataHandler";
import { renderRouterWithProviders } from "../../utils/testUtils/testUtils";

describe("Given a NoData component", () => {
  describe("When it is rendered and it receives `pedidos` as pageName", () => {
    test("Then it should show the text `No se han encontrado resultados`", () => {
      const text = "No se han encontrado resultados";
      const pageName = "pedidos";

      renderRouterWithProviders(
        <NoDataHandler pageName={pageName} search="" />,
      );

      const expectedText = screen.getByText(text);

      expect(expectedText).toBeInTheDocument();
    });

    test("Then it should show a button ", () => {
      const pageName = "productos";

      renderRouterWithProviders(
        <NoDataHandler pageName={pageName} search="hola" />,
      );

      const expectedButton = screen.getByRole("button");

      expect(expectedButton).toBeInTheDocument();
    });
  });
});
