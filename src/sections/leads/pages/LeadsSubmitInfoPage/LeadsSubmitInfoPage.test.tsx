import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "assets/styles/theme";
import { LeadsApiResponse } from "modules/leads/domain/Leads";
import { LeadsRepository } from "modules/leads/domain/LeadsRepository";
import { LeadsContextProvider } from "sections/leads/LeadsContext/LeadsContext";
import { registrationLinkCopy } from "sections/leads/utils/registrationLinkCopy";
import LeadsSubmitInfoPage from "./LeadsSubmitInfoPage";

const { getAllContactTypes, postCompany } = vi.hoisted(() => ({
  getAllContactTypes: vi.fn(),
  postCompany: vi.fn(),
}));

vi.mock("sections/company/CompanyContext/useCompanyContext", () => ({
  useCompanyContext: () => ({
    postCompany,
    isSuccess: false,
  }),
}));

vi.mock("sections/contact/ContactContext/useContactContext", () => ({
  useContactContext: () => ({
    contact_types: [{ id: 1, name: "TODO" }],
    getAllContactTypes,
  }),
}));

const getLeadsForm = vi.fn();

const renderPage = (search = "") => {
  const repository = {
    getLeadsForm,
  } as unknown as LeadsRepository<LeadsApiResponse>;

  return render(
    <MemoryRouter initialEntries={[`/client/register${search}`]}>
      <ThemeProvider theme={theme}>
        <LeadsContextProvider repository={repository}>
          <LeadsSubmitInfoPage />
        </LeadsContextProvider>
      </ThemeProvider>
    </MemoryRouter>,
  );
};

describe("Given the LeadsSubmitInfoPage", () => {
  beforeEach(() => {
    getLeadsForm.mockReset();
  });

  describe("When the url has no hash", () => {
    test("Then it should show the invalid link message and not call the API", async () => {
      renderPage();

      expect(
        await screen.findByText(registrationLinkCopy.invalid),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "Alta cliente" }),
      ).not.toBeInTheDocument();
      expect(getLeadsForm).not.toHaveBeenCalled();
    });
  });

  describe("When the lead link is expired", () => {
    test("Then it should show the expired message and hide the form", async () => {
      getLeadsForm.mockResolvedValue({
        success: false,
        message: "Registration link expired",
        error_code: "LINK_EXPIRED",
        code: 410,
      });

      renderPage("?hash=expired-hash");

      expect(
        await screen.findByText(registrationLinkCopy.expired),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "Alta cliente" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("When the lead link is invalid", () => {
    test("Then it should show the invalid link message", async () => {
      getLeadsForm.mockResolvedValue({
        success: false,
        message: "Registration link invalid",
        error_code: "LINK_INVALID",
        code: 404,
      });

      renderPage("?hash=invalid-hash");

      expect(
        await screen.findByText(registrationLinkCopy.invalid),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "Alta cliente" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("When the lead link is valid", () => {
    test("Then it should show the registration form", async () => {
      getLeadsForm.mockResolvedValue({
        success: true,
        data: {
          email: "lead@example.com",
          company_name: "Lead Co",
          phone: "600000001",
        },
        message: "Lead retrieved successfully",
      });

      renderPage("?hash=valid-hash");

      expect(
        await screen.findByRole("heading", { name: "Alta cliente" }),
      ).toBeInTheDocument();
    });
  });
});
