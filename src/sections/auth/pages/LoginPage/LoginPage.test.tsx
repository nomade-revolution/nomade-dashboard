import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "./LoginPage";
import { renderRouterWithProviders } from "../../../shared/utils/testUtils/testUtils";

describe("Given a LoginForm component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a button with the text 'Iniciar sesión'", () => {
      const buttonText = "Iniciar sesión";

      renderRouterWithProviders(<LoginPage />);

      const expectedButton = screen.getByRole("button", { name: buttonText });

      expect(expectedButton).toBeInTheDocument();
    });

    test("Then it should show a label with the text 'Contraseña'", () => {
      const labelText = "Contraseña";

      renderRouterWithProviders(<LoginPage />);

      const expectedLabel = screen.getByLabelText(labelText);

      expect(expectedLabel).toBeInTheDocument();
    });

    // test("Then it should show a link with the text 'Registrate aquí'", () => {
    //   const linkText = "Registrate aquí";

    //   renderRouterWithProviders(<LoginPage />);

    //   const expectedLink = screen.getByRole("link", { name: linkText });

    //   expect(expectedLink).toBeInTheDocument();
    // });
  });
});
