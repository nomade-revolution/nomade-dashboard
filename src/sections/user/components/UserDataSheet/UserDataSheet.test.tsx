import { screen, waitFor } from "@testing-library/react";
import { renderRouterWithProviders } from "../../../shared/utils/testUtils/testUtils";
import UserDatasheet from "./UserDataSheet";
import { mockFullUser } from "../../../../mocks/userMocks";
import userEvent from "@testing-library/user-event";

describe("Given a UserDataSheet component", () => {
  describe("When it is rendered & a user writes in the name input", () => {
    test("Then it should change the value of this input", async () => {
      const labelText = "Nombre";
      const userText = "John";

      renderRouterWithProviders(<UserDatasheet user={mockFullUser} />);

      const expectedInput = screen.getByLabelText(labelText);

      await waitFor(async () => {
        await userEvent.type(expectedInput, userText);
      });

      expect(expectedInput).toBeInTheDocument();
      expect(expectedInput).toHaveValue(userText);
    });
  });
});
