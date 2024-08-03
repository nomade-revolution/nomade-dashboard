import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import SuccessFeedback from "./SuccessFeedback";
import { renderWithProviders } from "sections/shared/utils/testUtils/testUtils";

describe("Given an ErrorFeedback component", () => {
  describe("When it is rendered and it receives a text", () => {
    test("Then it should show the text received", () => {
      const successText = "Página creada";

      renderWithProviders(<SuccessFeedback text={successText} />);

      const expectedText = screen.getByText(successText);

      expect(expectedText).toBeInTheDocument();
    });
  });
});
