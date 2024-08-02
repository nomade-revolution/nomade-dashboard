import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../utils/testUtils";
import ErrorFeedback from "./ErrorFeedback";

describe("Given an ErrorFeedback component", () => {
  describe("When it is rendered and it receives a text", () => {
    test("Then it should show the text received", () => {
      const errorText = "Ha ocurrido un error";

      renderWithProviders(<ErrorFeedback text={errorText} />);

      const expectedText = screen.getByText(errorText);

      expect(expectedText).toBeInTheDocument();
    });
  });
});
