import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { vi } from "vitest";
import { CompanyRepository } from "@company/domain/CompanyRepository";
import { Company } from "modules/user/domain/User";
import { CompanyContextProvider } from "./CompanyContext";
import { useCompanyContext } from "./useCompanyContext";

const getCompanyOptions = vi.fn();

const repository = {
  getCompanyOptions,
} as unknown as CompanyRepository<{ success: boolean; company: Company }>;

const paginated = (companies: Partial<Company>[]) => ({
  success: true,
  data: {
    companies,
    pagination: { current_page: 1, last_page: 1, per_page: 20 },
  },
  message: "ok",
});

const OptionsProbe = () => {
  const { companies, fetchCompanyOptions } = useCompanyContext();
  const [names, setNames] = useState("pending");

  return (
    <>
      <div data-testid="global-companies">
        {companies.map((company) => company.company).join("|")}
      </div>
      <div data-testid="result">{names}</div>
      <button
        type="button"
        onClick={async () => {
          const result = await fetchCompanyOptions("acm");
          setNames(result.map((company) => company.company).join("|"));
        }}
      >
        search
      </button>
      <button
        type="button"
        onClick={async () => {
          const result = await fetchCompanyOptions();
          setNames(result.map((company) => company.company).join("|"));
        }}
      >
        initial
      </button>
      <button
        type="button"
        onClick={async () => {
          const controller = new AbortController();
          const pending = fetchCompanyOptions("acm", controller.signal);
          controller.abort();
          const result = await pending;
          setNames(String(result.length));
        }}
      >
        abort
      </button>
    </>
  );
};

const renderProbe = () =>
  render(
    <CompanyContextProvider repository={repository}>
      <OptionsProbe />
    </CompanyContextProvider>,
  );

describe("Given fetchCompanyOptions", () => {
  beforeEach(() => {
    getCompanyOptions.mockReset();
  });

  test("Then a paginated response returns companies and leaves the global list untouched", async () => {
    getCompanyOptions.mockResolvedValue(
      paginated([{ id: 7, company: "Acme", company_name: "Acme SL" }]),
    );
    renderProbe();

    await userEvent.click(screen.getByRole("button", { name: "search" }));

    await waitFor(() => {
      expect(screen.getByTestId("result")).toHaveTextContent("Acme");
    });
    expect(getCompanyOptions).toHaveBeenCalledWith(
      1,
      20,
      {
        order: [{ by: "company", dir: "ASC" }],
        filters: { search: "acm" },
      },
      undefined,
    );
    expect(screen.getByTestId("global-companies")).toHaveTextContent("");
  });

  test("Then an array response is also accepted", async () => {
    getCompanyOptions.mockResolvedValue({
      success: true,
      data: [{ id: 2, company: "Array Co", company_name: "Array Co" }],
      message: "ok",
    });
    renderProbe();

    await userEvent.click(screen.getByRole("button", { name: "initial" }));

    await waitFor(() => {
      expect(screen.getByTestId("result")).toHaveTextContent("Array Co");
    });
    expect(getCompanyOptions).toHaveBeenCalledWith(
      1,
      20,
      { order: [{ by: "company", dir: "ASC" }] },
      undefined,
    );
  });

  test("Then a failed response returns an empty list", async () => {
    getCompanyOptions.mockResolvedValue({ success: false, message: "no" });
    renderProbe();

    await userEvent.click(screen.getByRole("button", { name: "initial" }));

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toBe("");
    });
    expect(screen.getByTestId("global-companies")).toHaveTextContent("");
  });

  test("Then an aborted request returns an empty list", async () => {
    getCompanyOptions.mockResolvedValue(
      paginated([{ id: 7, company: "Acme", company_name: "Acme SL" }]),
    );
    renderProbe();

    await userEvent.click(screen.getByRole("button", { name: "abort" }));

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toBe("0");
    });
  });
});
