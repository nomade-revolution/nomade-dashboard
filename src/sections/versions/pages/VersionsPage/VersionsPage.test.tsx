import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import theme from "assets/styles/theme";
import { Version } from "modules/versions/domain";
import { VersionRepository } from "modules/versions/domain/VersionRepository";
import {
  AuthContext,
  ContextState,
} from "sections/auth/AuthContext/AuthContext";
import { VersionsContextProvider } from "sections/versions/VersionsContext/VersionsContext";
import VersionsPage from "./VersionsPage";

const versions: Version[] = [
  {
    id: 2,
    version: "1.1.0",
    maintenance: false,
    ios_required: false,
    android_required: false,
    created_at: "01-02-2026",
    updated_at: "02-02-2026 10:00",
  },
  {
    id: 5,
    version: "3.0.0",
    maintenance: false,
    ios_required: false,
    android_required: true,
    created_at: "01-03-2026",
    updated_at: "02-03-2026 10:00",
  },
  {
    id: 1,
    version: "1.0.0",
    maintenance: true,
    ios_required: false,
    android_required: false,
    created_at: "01-01-2026",
    updated_at: "02-01-2026 10:00",
  },
];

const renderPage = (repository: VersionRepository) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <VersionsContextProvider repository={repository}>
          <VersionsPage />
        </VersionsContextProvider>
      </MemoryRouter>
    </ThemeProvider>,
  );

const renderAsCompany = (repository: VersionRepository) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <AuthContext.Provider
          value={{ user: { type: "Company" } } as ContextState}
        >
          <VersionsContextProvider repository={repository}>
            <VersionsPage />
          </VersionsContextProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    </ThemeProvider>,
  );

const buildRepository = (
  updateVersion: VersionRepository["updateVersion"] = vi.fn(),
): VersionRepository => ({
  getVersions: vi.fn().mockResolvedValue({
    success: true,
    message: "ok",
    data: {
      versions,
      pagination: { current_page: 1, last_page: 1, per_page: 100 },
    },
  }),
  updateVersion,
});

const flag = (name: string) =>
  screen.getAllByRole("checkbox", { name, hidden: true })[0];

describe("Given the VersionsPage", () => {
  describe("When versions are loaded", () => {
    test("Then it shows them in the order received", async () => {
      renderPage(buildRepository());

      expect(
        await screen.findByRole("heading", { name: "Versiones de la app" }),
      ).toBeInTheDocument();

      const table = document.querySelector("table");
      const body = table?.querySelector("tbody");
      expect(body).not.toBeNull();
      const text = body?.textContent ?? "";
      expect(text.indexOf("1.1.0")).toBeLessThan(text.indexOf("3.0.0"));
      expect(text.indexOf("3.0.0")).toBeLessThan(text.indexOf("1.0.0"));
      expect(flag("Mantenimiento 1.0.0")).toBeChecked();
      expect(flag("Mantenimiento 3.0.0")).not.toBeChecked();
      expect(flag("Act. obligatoria Android 3.0.0")).toBeChecked();
    });
  });

  describe("When a switch is pressed", () => {
    test("Then it opens the confirm dialog and does not call the repository", async () => {
      const repository = buildRepository();
      renderPage(repository);

      await screen.findByRole("heading", { name: "Versiones de la app" });
      await userEvent.click(flag("Mantenimiento 3.0.0"));

      expect(
        await screen.findByText(
          "Vas a activar el modo mantenimiento en la versión 3.0.0. Los usuarios con esa versión verán la pantalla de mantenimiento y no podrán usar la app.",
        ),
      ).toBeInTheDocument();
      expect(repository.updateVersion).not.toHaveBeenCalled();
      expect(flag("Mantenimiento 3.0.0")).not.toBeChecked();
    });
  });

  describe("When the dialog is cancelled", () => {
    test("Then the repository is not called and the switch stays unchanged", async () => {
      const repository = buildRepository();
      renderPage(repository);

      await screen.findByRole("heading", { name: "Versiones de la app" });
      await userEvent.click(flag("Mantenimiento 3.0.0"));
      await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

      expect(repository.updateVersion).not.toHaveBeenCalled();
      expect(flag("Mantenimiento 3.0.0")).not.toBeChecked();
      expect(
        screen.queryByText(/Vas a activar el modo mantenimiento/),
      ).not.toBeInTheDocument();
    });
  });

  describe("When the change is confirmed", () => {
    test("Then it updates only that flag and the row shows the response", async () => {
      let resolveUpdate: (value: unknown) => void = () => undefined;
      const updateVersion = vi.fn().mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveUpdate = resolve;
          }),
      );
      renderPage(buildRepository(updateVersion));

      await screen.findByRole("heading", { name: "Versiones de la app" });
      await userEvent.click(flag("Mantenimiento 3.0.0"));
      const confirmClick = userEvent.click(
        screen.getByRole("button", { name: "Confirmar" }),
      );

      await waitFor(() => {
        expect(updateVersion).toHaveBeenCalledTimes(1);
      });
      expect(updateVersion).toHaveBeenCalledWith(5, { maintenance: true });
      expect(flag("Mantenimiento 3.0.0")).toBeDisabled();
      expect(flag("Mantenimiento 3.0.0")).not.toBeChecked();

      resolveUpdate({
        success: true,
        message: "ok",
        data: {
          ...versions[1],
          maintenance: true,
          updated_at: "28-09-2026 13:00",
        },
      });
      await confirmClick;

      await waitFor(() => {
        expect(flag("Mantenimiento 3.0.0")).toBeChecked();
      });
      expect(flag("Mantenimiento 3.0.0")).not.toBeDisabled();
      expect(screen.getAllByText("28-09-2026 13:00").length).toBeGreaterThan(0);
      expect(screen.getByText("Cambio guardado")).toBeInTheDocument();
      expect(flag("Act. obligatoria Android 3.0.0")).toBeChecked();
    });
  });

  describe("When the repository fails", () => {
    test("Then the switch keeps its value and the error is shown", async () => {
      const updateVersion = vi
        .fn()
        .mockRejectedValue(new Error("No se ha podido guardar"));
      renderPage(buildRepository(updateVersion));

      await screen.findByRole("heading", { name: "Versiones de la app" });
      await userEvent.click(flag("Mantenimiento 1.1.0"));
      await userEvent.click(screen.getByRole("button", { name: "Confirmar" }));

      expect(
        await screen.findByText("No se ha podido guardar"),
      ).toBeInTheDocument();
      expect(flag("Mantenimiento 1.1.0")).not.toBeChecked();
      expect(updateVersion).toHaveBeenCalledWith(2, { maintenance: true });
    });
  });

  describe("When a required flag is turned on", () => {
    test("Then the latest-version warning appears only for the highest id", async () => {
      renderPage(buildRepository());
      await screen.findByRole("heading", { name: "Versiones de la app" });

      await userEvent.click(flag("Act. obligatoria iOS 3.0.0"));
      expect(
        await screen.findByText(/Es la última versión registrada/),
      ).toBeInTheDocument();
      const dialog = screen.getByRole("dialog");
      expect(
        within(dialog).getByText(
          "Vas a marcar como obligatoria la actualización en iOS para la versión 3.0.0. Los usuarios de iOS con esa versión no podrán usar la app hasta actualizar.",
        ),
      ).toBeInTheDocument();

      await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

      await userEvent.click(flag("Act. obligatoria iOS 1.1.0"));
      expect(
        screen.queryByText(/Es la última versión registrada/),
      ).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

      await userEvent.click(flag("Mantenimiento 3.0.0"));
      expect(
        screen.queryByText(/Es la última versión registrada/),
      ).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

      await userEvent.click(flag("Act. obligatoria Android 3.0.0"));
      expect(
        screen.getByText(
          "Vas a quitar la actualización obligatoria en Android para la versión 3.0.0.",
        ),
      ).toBeInTheDocument();
      expect(
        screen.queryByText(/Es la última versión registrada/),
      ).not.toBeInTheDocument();
    });
  });

  describe("When the user is a Company", () => {
    test("Then getVersions is not called", async () => {
      const repository = buildRepository();
      renderAsCompany(repository);

      await act(async () => {
        await Promise.resolve();
      });

      expect(repository.getVersions).not.toHaveBeenCalled();
      expect(
        screen.queryByRole("heading", { name: "Versiones de la app" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("When a change has been saved", () => {
    test("Then the success message disappears after 3 seconds", async () => {
      vi.useFakeTimers();
      const updateVersion = vi.fn().mockResolvedValue({
        success: true,
        message: "ok",
        data: {
          ...versions[1],
          maintenance: true,
        },
      });

      try {
        renderPage(buildRepository(updateVersion));

        await act(async () => {
          await Promise.resolve();
        });

        expect(
          screen.getByRole("heading", { name: "Versiones de la app" }),
        ).toBeInTheDocument();

        fireEvent.click(flag("Mantenimiento 3.0.0"));
        fireEvent.click(screen.getByRole("button", { name: "Confirmar" }));

        await act(async () => {
          await Promise.resolve();
        });

        expect(screen.getByText("Cambio guardado")).toBeInTheDocument();

        act(() => {
          vi.advanceTimersByTime(2999);
        });
        expect(screen.getByText("Cambio guardado")).toBeInTheDocument();

        act(() => {
          vi.advanceTimersByTime(1);
        });
        expect(screen.queryByText("Cambio guardado")).not.toBeInTheDocument();
      } finally {
        vi.useRealTimers();
      }
    });
  });
});
