import { vi } from "vitest";
import { COMPANY_BASE } from "../application/routes";
import { CompanyRepository } from "./companyRepository";

const get = vi.hoisted(() => vi.fn());

vi.mock("@core/application", () => ({
  Http: {
    getInstance: () => ({
      get,
    }),
  },
}));

describe("Given a CompanyRepository", () => {
  describe("When getCompanyOptions is called", () => {
    test("Then it requests page 1 ordered by company and forwards the abort signal", async () => {
      const signal = new AbortController().signal;
      get.mockResolvedValue({
        success: true,
        data: { companies: [], pagination: {} },
        message: "ok",
      });

      const repository = new CompanyRepository();
      await repository.getCompanyOptions(
        1,
        20,
        {
          order: [{ by: "company", dir: "ASC" }],
          filters: { search: "acm" },
        },
        signal,
      );

      expect(get).toHaveBeenCalledWith(
        COMPANY_BASE,
        {
          page: 1,
          per_page: 20,
          order: [{ by: "company", dir: "ASC" }],
          filters: { search: "acm" },
        },
        undefined,
        signal,
      );
    });
  });
});
