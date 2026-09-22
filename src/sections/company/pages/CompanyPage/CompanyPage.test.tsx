import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { CompanyContext } from "sections/company/CompanyContext/CompanyContext";
import CompaniesPage from "./CompanyPage";
import {
  mockCompanyContextValue,
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

describe("Given the CompanyPage", () => {
  describe("When the user searches and goes to page 2", () => {
    test("Then the URL and getCompaniesPaginated keep the search filter", async () => {
      const getCompaniesPaginated = vi.fn();
      const { router } = renderPageOnRoute(
        "/clientes/page/:page",
        "/clientes/page/1",
        <CompanyContext.Provider
          value={mockCompanyContextValue(getCompaniesPaginated)}
        >
          <CompaniesPage />
        </CompanyContext.Provider>,
      );

      await userEvent.type(
        screen.getByPlaceholderText("Buscar clientes"),
        "Maria Vallespi",
      );
      await userEvent.click(
        screen.getByRole("button", { name: "Buscar clientes" }),
      );

      await waitFor(() => {
        expect(router.state.location.search).toContain("search=Maria");
      });
      await waitFor(() => {
        expect(getCompaniesPaginated).toHaveBeenCalledWith(
          1,
          10,
          expect.objectContaining({
            filters: expect.objectContaining({ search: "Maria Vallespi" }),
          }),
        );
      });

      await userEvent.click(screen.getByLabelText("Go to page 2"));

      await waitFor(() => {
        expect(router.state.location.pathname).toContain("/clientes/page/2");
        expect(router.state.location.search).toContain("search=Maria");
      });
      await waitFor(() => {
        expect(getCompaniesPaginated).toHaveBeenCalledWith(
          2,
          10,
          expect.objectContaining({
            filters: expect.objectContaining({ search: "Maria Vallespi" }),
          }),
        );
      });
    });
  });
});
