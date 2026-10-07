import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "assets/styles/theme";
import { LeadsApiResponse } from "modules/leads/domain/Leads";
import { LeadsRepository } from "modules/leads/domain/LeadsRepository";
import { LeadsContextProvider } from "sections/leads/LeadsContext/LeadsContext";
import { registrationLinkCopy } from "sections/leads/utils/registrationLinkCopy";
import LeadsSubmitInfoPage from "sections/leads/pages/LeadsSubmitInfoPage/LeadsSubmitInfoPage";

const {
  postCompany,
  getAllContactTypes,
  getAllCountries,
  getAllCities,
  countries,
  cities,
  contactTypes,
} = vi.hoisted(() => ({
  postCompany: vi.fn(),
  getAllContactTypes: vi.fn(),
  getAllCountries: vi.fn(),
  getAllCities: vi.fn(),
  countries: [{ id: 1, name: "Spain" }],
  cities: [{ id: 1, name: "Barcelona" }],
  contactTypes: [{ id: 1, name: "TODO" }],
}));

vi.mock("sections/company/CompanyContext/useCompanyContext", () => ({
  useCompanyContext: () => ({
    postCompany,
    isSuccess: false,
  }),
}));

vi.mock("sections/contact/ContactContext/useContactContext", () => ({
  useContactContext: () => ({
    contact_types: contactTypes,
    getAllContactTypes,
  }),
}));

vi.mock("sections/country/CountryContext/useCountryContext", () => ({
  useCountryContext: () => ({
    getAllCountries,
    countries,
  }),
}));

vi.mock("sections/city/CityContext/useCitiesContext", () => ({
  useCitiesContext: () => ({
    cities,
    getAllCities,
  }),
}));

const getLeadsForm = vi.fn();

const renderRegisterPage = () => {
  const repository = {
    getLeadsForm,
  } as unknown as LeadsRepository<LeadsApiResponse>;

  return render(
    <MemoryRouter initialEntries={["/client/register?hash=valid-hash"]}>
      <ThemeProvider theme={theme}>
        <LeadsContextProvider repository={repository}>
          <LeadsSubmitInfoPage />
        </LeadsContextProvider>
      </ThemeProvider>
    </MemoryRouter>,
  );
};

const fillAndSubmit = async () => {
  // delay: null avoids a setTimeout per keystroke; this flow types ~80 chars
  const user = userEvent.setup({ delay: null });

  await user.type(
    await screen.findByLabelText("Denominación social"),
    "Marca Ejemplo",
  );
  await user.type(screen.getByLabelText("NIF"), "A12345678");
  await user.type(screen.getByLabelText("Nombre comercial"), "Marca");
  await user.type(screen.getByLabelText("Teléfono"), "600111222");
  await user.type(screen.getByLabelText("Email"), "lead@example.com");
  await user.type(screen.getByLabelText("Móvil"), "600111222");
  await user.type(screen.getByLabelText("Contraseña"), "Aa1!aaaa");
  await user.type(screen.getByLabelText("Repite contraseña"), "Aa1!aaaa");

  await user.click(screen.getByRole("button", { name: "Añadir dirección" }));
  await user.type(screen.getByLabelText("Dirección"), "Carrer Example 1");
  await user.type(screen.getByLabelText("Código postal"), "08001");
  await user.type(screen.getByLabelText("Provincia"), "Barcelona");
  await user.click(screen.getByRole("button", { name: "Guardar" }));
  expect(await screen.findByText("Dirección añadida")).toBeInTheDocument();

  const checkboxes = screen.getAllByRole("checkbox");
  for (const checkbox of checkboxes) {
    await user.click(checkbox);
  }

  await user.click(screen.getByRole("button", { name: "Enviar" }));
};

describe("Given the LeadsForm on the public register page", () => {
  // Full form fill + submit is slow on CI (default 5s timeout is not enough).
  vi.setConfig({ testTimeout: 20000 });

  beforeEach(() => {
    postCompany.mockReset();
    getAllContactTypes.mockReset();
    getLeadsForm.mockReset();
    getLeadsForm.mockResolvedValue({
      success: true,
      data: {
        email: "",
        company_name: "",
        phone: "",
        address: { address: "Carrer 1" },
      },
      message: "Lead retrieved successfully",
    });
  });

  describe("When submit returns LINK_EXPIRED", () => {
    test("Then the page should replace the form with the expired message", async () => {
      postCompany.mockResolvedValue({
        success: false,
        message: "Registration link expired",
        error_code: "LINK_EXPIRED",
        code: 410,
      });

      renderRegisterPage();
      await fillAndSubmit();

      expect(
        await screen.findByText(registrationLinkCopy.expired),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "Alta cliente" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("When submit returns a server error", () => {
    test("Then it should show the generic error and keep the filled form", async () => {
      postCompany.mockResolvedValue({
        success: false,
        message: "Database Error",
        code: 500,
      });

      renderRegisterPage();
      await fillAndSubmit();

      expect(
        await screen.findByText(registrationLinkCopy.submitError),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Denominación social")).toHaveValue(
        "Marca Ejemplo",
      );
      expect(
        screen.getByRole("heading", { name: "Alta cliente" }),
      ).toBeInTheDocument();
    });
  });
});
