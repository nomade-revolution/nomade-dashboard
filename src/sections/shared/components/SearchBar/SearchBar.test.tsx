import { screen, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";
import { renderRouterWithProviders } from "../../utils/testUtils/testUtils";
import { vi } from "vitest";

describe("Given a SearchBar component", () => {
  const inputPlaceHolderText = "Buscar pedidos";

  describe("When it is rendered", () => {
    test("Then it should show an input & a submitt button", () => {
      const buttonAriaLabelText = "Buscar pedidos";

      renderRouterWithProviders(
        <SearchBar
          onReset={vi.fn()}
          pageName="pedidos"
          pageTypes={"pedidos"}
          onSearchSubmit={vi.fn()}
          searchText=""
          setSearchText={vi.fn()}
          setFilters={vi.fn()}
        />,
      );

      const expectedInput = screen.getByPlaceholderText(inputPlaceHolderText);
      const expectedButton = screen.getByLabelText(buttonAriaLabelText);

      expect(expectedInput).toBeInTheDocument();
      expect(expectedButton).toBeInTheDocument();
    });
  });

  describe("When the user writes `Hola` in the input", () => {
    test("Then the value of this input should change", async () => {
      const userText = "Hola";

      renderRouterWithProviders(
        <SearchBar
          onReset={vi.fn()}
          pageName="pedidos"
          pageTypes={"pedidos"}
          onSearchSubmit={vi.fn()}
          searchText="Hola"
          setSearchText={vi.fn()}
          setFilters={vi.fn()}
        />,
      );

      const expectedInput = screen.getByPlaceholderText(inputPlaceHolderText);

      await waitFor(() => userEvent.type(expectedInput, userText));

      expect(expectedInput).toHaveValue(userText);
    });
  });
});
