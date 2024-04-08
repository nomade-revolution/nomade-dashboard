import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "./LoginPage";
import { renderWithProviders } from "../../shared/utils/testUtils/testUtils";

describe("Given a LoginForm component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a button with the text 'Iniciar sesión'", () => {
      const buttonText = "Iniciar sesión";

      renderWithProviders(<LoginPage />);

      const expectedButton = screen.getByRole("button", { name: buttonText });

      expect(expectedButton).toBeInTheDocument();
    });

    test("Then it should show a label with the text 'Contraseña'", () => {
      const labelText = "Contraseña";

      renderWithProviders(<LoginPage />);

      const expectedLabel = screen.getByLabelText(labelText);

      expect(expectedLabel).toBeInTheDocument();
    });

    test("Then it should show a link with the text 'Registrate aquí'", () => {
      const linkText = "Registrate aquí";

      renderWithProviders(<LoginPage />);

      const expectedLink = screen.getByRole("link", { name: linkText });

      expect(expectedLink).toBeInTheDocument();
    });

    test("Then it should show a logo image ", () => {
      renderWithProviders(<LoginPage />);

      const expectedImage = screen.getByRole("img");

      expect(expectedImage).toBeInTheDocument();
    });
  });
});
