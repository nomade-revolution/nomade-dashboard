import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
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

  describe("When creating a client", () => {
    const emailMessage =
      "Ya existe un usuario con este email. Si el restaurante lo gestiona la misma persona, añádelo desde Usuarios → Añadir cliente.";
    const createFailureMessage =
      "No se ha podido crear el cliente. Inténtalo de nuevo; si sigue fallando, avisa a soporte.";

    const renderCreateForm = (
      onSubmit: (company: FormData) => Promise<unknown>,
      setIsOpen = vi.fn(),
    ) => {
      const view = render(
        <MemoryRouter>
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
                  <CompanyForm onSubmit={onSubmit} setIsOpen={setIsOpen} />
                </ContactContext.Provider>
              </CompanyContext.Provider>
            </AuthContext.Provider>
          </ThemeProvider>
        </MemoryRouter>,
      );

      return { ...view, setIsOpen };
    };

    const fillCreateClientForm = async (
      user: ReturnType<typeof userEvent.setup>,
      container: HTMLElement,
    ) => {
      const values: Record<string, string> = {
        company: "Casa Pepe",
        company_name: "Casa Pepe SL",
        nif: "B12345678",
        description: "Restaurante de prueba",
        name: "Ana",
        email: "ana@acme.test",
        password: "Abcdef1!",
        password_confirmation: "Abcdef1!",
      };

      for (const [id, value] of Object.entries(values)) {
        const field = container.querySelector<HTMLElement>(`#${id}`);
        if (!field) {
          throw new Error(`Missing #${id}`);
        }
        await user.type(field, value);
      }

      const checkboxes = container.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]',
      );
      await user.click(checkboxes[checkboxes.length - 1]);
    };

    test("Then a 422 with data.email keeps the form, the values and the message under Email", async () => {
      let resolveSubmit: (value: unknown) => void = () => undefined;
      const onSubmit = vi.fn(
        () =>
          new Promise((resolve) => {
            resolveSubmit = resolve;
          }),
      );
      const user = userEvent.setup({ delay: null });
      const { container } = renderCreateForm(onSubmit);

      await fillCreateClientForm(user, container);
      await user.click(screen.getByRole("button", { name: "Crear cliente" }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });

      const submitButton = container.querySelector("button[type='submit']");
      expect(submitButton).toBeDisabled();
      expect(container.querySelector("#email")).toHaveValue("ana@acme.test");
      expect(container.querySelector("#company")).toHaveValue("Casa Pepe");
      expect(
        screen.getByRole("heading", { name: "Cliente" }),
      ).toBeInTheDocument();

      resolveSubmit({
        success: false,
        code: 422,
        message: emailMessage,
        data: {
          email: [emailMessage],
          "address.city": ["La ciudad no es válida."],
        },
      });

      const emailField = container.querySelector("#email");
      await waitFor(() => {
        expect(emailField?.closest(".form-subsection")).toHaveTextContent(
          emailMessage,
        );
      });
      expect(emailField).toHaveValue("ana@acme.test");
      expect(container.querySelector("#company")).toHaveValue("Casa Pepe");
      expect(container.querySelector("#company_name")).toHaveValue(
        "Casa Pepe SL",
      );
      expect(container.querySelector("#nif")).toHaveValue("B12345678");
      expect(
        screen.getByText("address.city: La ciudad no es válida."),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Crear cliente" }),
      ).toBeEnabled();
    });

    test("Then a 500 without data keeps the values and shows the support alert", async () => {
      const onSubmit = vi.fn().mockResolvedValue({
        success: false,
        code: 500,
        message: "Server Error",
      });
      const user = userEvent.setup({ delay: null });
      const { container } = renderCreateForm(onSubmit);

      await fillCreateClientForm(user, container);
      await user.click(screen.getByRole("button", { name: "Crear cliente" }));

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent(
          createFailureMessage,
        );
      });
      expect(container.querySelector("#email")).toHaveValue("ana@acme.test");
      expect(container.querySelector("#company_name")).toHaveValue(
        "Casa Pepe SL",
      );
      expect(container.querySelector("#description")).toHaveValue(
        "Restaurante de prueba",
      );
      expect(
        screen.getByRole("button", { name: "Crear cliente" }),
      ).toBeEnabled();
    });

    test("Then a successful create calls setIsOpen(false)", async () => {
      const onSubmit = vi.fn().mockResolvedValue({
        success: true,
        message: "Company created successfully",
        data: { id: 9 },
      });
      const setIsOpen = vi.fn();
      const user = userEvent.setup({ delay: null });
      const { container } = renderCreateForm(onSubmit, setIsOpen);

      await fillCreateClientForm(user, container);
      await user.click(screen.getByRole("button", { name: "Crear cliente" }));

      await waitFor(() => {
        expect(setIsOpen).toHaveBeenCalledWith(false);
      });
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
