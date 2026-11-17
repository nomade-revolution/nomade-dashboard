import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { vi } from "vitest";
import theme from "assets/styles/theme";
import { Company } from "modules/user/domain/User";
import { AuthContext } from "sections/auth/AuthContext/AuthContext";
import { CompanyContext } from "sections/company/CompanyContext/CompanyContext";
import { ContactContext } from "sections/contact/ContactContext/ContactContext";
import CompanyForm from "./CompanyForm";

vi.mock("sections/shared/components/ReusableModal/ReusableModal", () => ({
  default: () => null,
}));

vi.mock("sections/shared/components/CustomFileInput/CustomFileInput", () => ({
  default: () => null,
}));

const clientWithoutAddress = {
  id: 205,
  nif: "B12345678",
  company: "Acme",
  company_name: "Acme SL",
  description: "Una empresa",
  phone: "600000000",
  web: "",
  name: "Ana",
  email: "ana@acme.test",
  company_comments: "",
  image: "",
  socialMedia: [],
  contacts: [],
  users: [],
  plan: {
    start_date: "01-01-2026",
    plan_id: 1,
    comments: "",
    billing: "",
    plan_name: "Basico",
  },
} as unknown as Company;

describe("Given the CompanyForm component", () => {
  describe("When editing a company that has no address", () => {
    test("Then the payload does not send address", async () => {
      const onSubmit = vi.fn().mockResolvedValue({ success: true });

      render(
        <ThemeProvider theme={theme}>
          <AuthContext.Provider
            value={{ user: { id: 1, type: "Nomade" } } as never}
          >
            <CompanyContext.Provider
              value={
                {
                  isSuccess: false,
                  isError: false,
                  loading: false,
                  editCompanyCms: vi.fn(),
                } as never
              }
            >
              <ContactContext.Provider
                value={
                  {
                    contact_types: [],
                    getAllContactTypes: vi.fn(),
                  } as never
                }
              >
                <CompanyForm
                  type="edit"
                  client={clientWithoutAddress}
                  onSubmit={onSubmit}
                  setIsOpen={vi.fn()}
                />
              </ContactContext.Provider>
            </CompanyContext.Provider>
          </AuthContext.Provider>
        </ThemeProvider>,
      );

      await userEvent.click(
        screen.getByRole("button", { name: "Guardar cambios" }),
      );

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
      });

      const formData = onSubmit.mock.calls[0][0] as FormData;
      expect(formData.has("address")).toBe(false);
      expect(formData.get("address")).toBeNull();
    });
  });
});
