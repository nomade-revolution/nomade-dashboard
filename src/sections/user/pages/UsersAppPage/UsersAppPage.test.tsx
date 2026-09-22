import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { UserContext } from "sections/user/UserContext/UserContext";
import UsersAppPage from "./UsersAppPage";
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

describe("Given the UsersAppPage", () => {
  describe("When the user searches and goes to page 2", () => {
    test("Then the URL and getUsers keep the search filter", async () => {
      const getUsers = vi.fn();
      const { router } = renderPageOnRoute(
        "/users-app/page/:page",
        "/users-app/page/1",
        <UserContext.Provider value={mockUserContextValue(getUsers)}>
          <UsersAppPage />
        </UserContext.Provider>,
      );

      await userEvent.type(
        screen.getByPlaceholderText("Buscar users-app"),
        "Maria Vallespi",
      );
      await userEvent.click(
        screen.getByRole("button", { name: "Buscar users-app" }),
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
          "InfluencerCompany",
        );
      });

      await userEvent.click(screen.getByLabelText("Go to page 2"));

      await waitFor(() => {
        expect(router.state.location.pathname).toContain("/users-app/page/2");
        expect(router.state.location.search).toContain("search=Maria");
      });
      await waitFor(() => {
        expect(getUsers).toHaveBeenCalledWith(
          2,
          10,
          expect.objectContaining({
            filters: expect.objectContaining({ search: "Maria Vallespi" }),
          }),
          "InfluencerCompany",
        );
      });
    });
  });
});
