import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { UserContext } from "sections/user/UserContext/UserContext";
import UsersPage from "./UsersPage";
import {
  mockUserContextValue,
  renderPageOnRoute,
} from "sections/shared/utils/testUtils/listPageSearchTestUtils";

vi.mock("sections/shared/components/DashboardTable/DashboardTable", () => ({
  default: () => null,
}));
vi.mock(
  "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile",
  () => ({
    default: () => null,
  }),
);

describe("Given the UsersPage", () => {
  describe("When the user searches and goes to page 2", () => {
    test("Then the URL and getUsers keep the search filter", async () => {
      const getUsers = vi.fn();
      const { router } = renderPageOnRoute(
        "/usuarios/page/:page",
        "/usuarios/page/1",
        <UserContext.Provider value={mockUserContextValue(getUsers)}>
          <UsersPage />
        </UserContext.Provider>,
      );

      await userEvent.type(
        screen.getByPlaceholderText("Buscar usuarios"),
        "Maria Vallespi",
      );
      await userEvent.click(
        screen.getByRole("button", { name: "Buscar usuarios" }),
      );

      await waitFor(() => {
        expect(router.state.location.search).toContain("search=Maria");
      });
      await waitFor(() => {
        expect(getUsers).toHaveBeenCalledWith(
          1,
          10,
          expect.objectContaining({
            filters: expect.objectContaining({ search: "Maria Vallespi" }),
          }),
          "Nomade",
        );
      });

      await userEvent.click(screen.getByLabelText("Go to page 2"));

      await waitFor(() => {
        expect(router.state.location.pathname).toContain("/usuarios/page/2");
        expect(router.state.location.search).toContain("search=Maria");
      });
      await waitFor(() => {
        expect(getUsers).toHaveBeenCalledWith(
          2,
          10,
          expect.objectContaining({
            filters: expect.objectContaining({ search: "Maria Vallespi" }),
          }),
          "Nomade",
        );
      });
    });
  });
});
