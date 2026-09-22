import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../../../../assets/styles/theme";
import { UserContext } from "sections/user/UserContext/UserContext";
import { CompanyContext } from "sections/company/CompanyContext/CompanyContext";
import { vi } from "vitest";

export const mockPagination = {
  current_page: 1,
  last_page: 3,
  per_page: 10,
};

export const mockOrder = { sortTag: "", direction: null };

export const renderPageOnRoute = (
  path: string,
  initialEntry: string,
  element: React.ReactElement,
) => {
  const router = createMemoryRouter([{ path, element }], {
    initialEntries: [initialEntry],
  });

  const view = render(
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );

  return { router, ...view };
};

export const mockUserContextValue = (getUsers: ReturnType<typeof vi.fn>) =>
  ({
    getUsers,
    users_nomade: [],
    users_influencer: [],
    users_company: [],
    users_influencerCompany: [],
    pagination: mockPagination,
    loading: false,
    error: null,
    isSuccess: false,
    order: mockOrder,
    badgeCount: 0,
    deleteUserById: vi.fn(),
    setOrder: vi.fn(),
    getUsersStatusBadge: vi.fn(),
    registerUser: vi.fn(),
    exportInfluencers: vi.fn(),
    conditions: "",
    getConditions: vi.fn(),
    getRolesList: vi.fn(),
    rolesList: [],
    getUser: vi.fn(),
    userData: null,
    modifyUserById: vi.fn(),
    setBadgeCount: vi.fn(),
  }) as unknown as React.ComponentProps<typeof UserContext.Provider>["value"];

export const mockCompanyContextValue = (
  getCompaniesPaginated: ReturnType<typeof vi.fn>,
) =>
  ({
    loading: false,
    isSuccess: false,
    isError: false,
    company: {},
    badgeCount: 0,
    companies: [],
    pagination: mockPagination,
    orderCompanies: mockOrder,
    setOrderCompanies: vi.fn(),
    getCompaniesWithParams: vi.fn(),
    getCompaniesPaginated,
    deleteCompanyById: vi.fn(),
    getCompany: vi.fn(),
    fetchCompanyById: vi.fn(),
    postCompany: vi.fn(),
    postBaseCompany: vi.fn(),
    getCompaniesStatusBadge: vi.fn(),
    postCompanyCms: vi.fn(),
    editCompanyCms: vi.fn(),
    exportCompaniesExcel: vi.fn(),
    exportCompanyBillingExcel: vi.fn(),
    setBadgeCount: vi.fn(),
  }) as unknown as React.ComponentProps<
    typeof CompanyContext.Provider
  >["value"];
