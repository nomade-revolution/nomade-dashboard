import { screen } from "@testing-library/react";
import { userRoleOptions } from "../../../user/utils/userRoleOptions";
import { renderWithProviders } from "../../utils/testUtils/testUtils";
import ReusableSelect from "./ReusableSelect";
import { vi } from "vitest";

describe("Given a ReusableSelect component", () => {
  describe("When it is rendered and pressed", () => {
    test("Then it should show Administrator option", async () => {
      renderWithProviders(
        <ReusableSelect
          label="Rol"
          options={userRoleOptions}
          setValue={vi.fn()}
          value="Administrator"
        />,
      );

      const expectedSelect = screen.getByLabelText("Seleccionar opciones");

      expect(expectedSelect).toBeInTheDocument();
    });
  });
});
