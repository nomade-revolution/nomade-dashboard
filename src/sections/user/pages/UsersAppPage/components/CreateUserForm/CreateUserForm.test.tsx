import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ThemeProvider } from "styled-components";
import theme from "assets/styles/theme";
import { CompanyRepository } from "@company/domain/CompanyRepository";
import { Company } from "modules/user/domain/User";
import { CompanyContextProvider } from "sections/company/CompanyContext/CompanyContext";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { UserContext } from "sections/user/UserContext/UserContext";
import { mockUserContextValue } from "sections/shared/utils/testUtils/listPageSearchTestUtils";
import CreateUserForm from "./CreateUserForm";

const getCompanyOptions = vi.fn();
const getCompanies = vi.fn();
const getCompaniesWithPagination = vi.fn();

const repository = {
  getCompanyOptions,
  getCompanies,
  getCompaniesWithPagination,
} as unknown as CompanyRepository<{ success: boolean; company: Company }>;

const initialCompanies = [
  { id: 3, company: "Initial Co", company_name: "Initial Co SL" },
  { id: 4, company_name: "Solo Nombre" },
];

const searchCompaniesResult = [
  { id: 7, company: "Acme Search", company_name: "Acme Search SL" },
];

const companiesFor = (search?: string) =>
  search ? searchCompaniesResult : initialCompanies;

const GlobalCompaniesProbe = () => {
  const { companies, getCompaniesWithParams } = useCompanyContext();

  return (
    <>
      <button
        type="button"
        onClick={() => {
          void getCompaniesWithParams({ filters: { search: "seed" } });
        }}
      >
        seed-companies
      </button>
      <div data-testid="global-companies">
        {companies.map((company) => company.company).join("|")}
      </div>
    </>
  );
};

const renderForm = () =>
  render(
    <ThemeProvider theme={theme}>
      <CompanyContextProvider repository={repository}>
        <UserContext.Provider value={mockUserContextValue(vi.fn())}>
          <GlobalCompaniesProbe />
          <CreateUserForm
            isFromUsersApp
            onSubmit={vi.fn()}
            setIsOpen={vi.fn()}
          />
        </UserContext.Provider>
      </CompanyContextProvider>
    </ThemeProvider>,
  );

const searchCalls = () =>
  getCompanyOptions.mock.calls.filter(
    (call) => call[2]?.filters?.search === "acm",
  );

const flushPromises = async () => {
  await act(async () => {
    await Promise.resolve();
  });
};

describe("Given a CreateUserForm opened from users-app", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    getCompanyOptions.mockReset();
    getCompanies.mockReset();
    getCompaniesWithPagination.mockReset();
    getCompanyOptions.mockImplementation(async (_page, _perPage, params) => ({
      success: true,
      data: {
        companies: companiesFor(params?.filters?.search),
        pagination: { current_page: 1, last_page: 1, per_page: 20 },
      },
      message: "ok",
    }));
    getCompanies.mockResolvedValue({
      success: true,
      data: [
        { id: 99, company: "Global Seed", company_name: "Global Seed SL" },
      ],
      message: "ok",
    });
  });

  test("Then it loads the initial companies even when the global list is empty", async () => {
    const user = userEvent.setup();
    renderForm();

    expect(screen.getByTestId("global-companies")).toHaveTextContent("");

    await user.click(
      screen.getByRole("combobox", { name: "Seleccionar empresa" }),
    );

    expect(
      await screen.findByRole("option", { name: "Initial Co" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Solo Nombre" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Global Seed" })).toBeNull();
    expect(getCompanyOptions).toHaveBeenCalledWith(
      1,
      20,
      { order: [{ by: "company", dir: "ASC" }] },
      expect.any(AbortSignal),
    );
    expect(getCompanies).not.toHaveBeenCalled();
    expect(getCompaniesWithPagination).not.toHaveBeenCalled();
    expect(screen.getByTestId("global-companies")).toHaveTextContent("");
  });

  test("Then typing acm sends one search after the debounce", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    renderForm();
    await flushPromises();
    const input = screen.getByRole("combobox", {
      name: "Seleccionar empresa",
    });

    for (const value of ["a", "ac", "acm"]) {
      fireEvent.change(input, { target: { value } });
    }
    await flushPromises();

    expect(searchCalls()).toHaveLength(0);

    await act(async () => {
      vi.advanceTimersByTime(400);
      await Promise.resolve();
    });

    expect(searchCalls()).toHaveLength(1);
    expect(searchCalls()[0][2]).toEqual(
      expect.objectContaining({
        filters: { search: "acm" },
        order: [{ by: "company", dir: "ASC" }],
      }),
    );
  });

  test("Then searching in the form does not change the global companies list", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    renderForm();
    await flushPromises();

    fireEvent.click(screen.getByRole("button", { name: "seed-companies" }));
    await flushPromises();

    expect(screen.getByTestId("global-companies")).toHaveTextContent(
      "Global Seed",
    );

    const globalCallsBeforeSearch = getCompanies.mock.calls.length;
    const input = screen.getByRole("combobox", {
      name: "Seleccionar empresa",
    });

    for (const value of ["a", "ac", "acm"]) {
      fireEvent.change(input, { target: { value } });
    }
    await flushPromises();
    await act(async () => {
      vi.advanceTimersByTime(400);
      await Promise.resolve();
    });

    expect(searchCalls()).toHaveLength(1);
    expect(screen.getByTestId("global-companies")).toHaveTextContent(
      "Global Seed",
    );
    expect(getCompanies).toHaveBeenCalledTimes(globalCallsBeforeSearch);
    expect(getCompaniesWithPagination).not.toHaveBeenCalled();
  });
});
