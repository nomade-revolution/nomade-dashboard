import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderRouterWithProviders } from "../../../shared/utils/testUtils/testUtils";
import UsersPage from "./UsersPage";

describe("Given a LoginForm component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a button with the text 'Crear usuario'", () => {
      const buttonText = "Crear usuario";

      renderRouterWithProviders(<UsersPage />);

      const expectedButton = screen.getByRole("button", { name: buttonText });

      expect(expectedButton).toBeInTheDocument();
    });

    test("Then it should show a table os users", () => {
      renderRouterWithProviders(<UsersPage />);

      const expectedLabel = screen.getByLabelText("dashboard table");

      expect(expectedLabel).toBeInTheDocument();
    });
  });
});
