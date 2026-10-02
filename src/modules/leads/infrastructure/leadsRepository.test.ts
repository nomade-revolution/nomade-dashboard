import { vi } from "vitest";
import { LEADS_BASE } from "../application/routes";
import { LeadsRepository } from "./leadsRepository";

const get = vi.hoisted(() => vi.fn());

vi.mock("@core/application", () => ({
  Http: {
    getInstance: () => ({
      get,
    }),
  },
}));

describe("Given a LeadsRepository", () => {
  describe("When getLeadsForm is called with a hash that contains /, + and =", () => {
    test("Then the request URL keeps / literal and encodes + and =", async () => {
      const hash = "abc+def/ghi=";
      get.mockResolvedValue({ success: true, data: {}, message: "ok" });

      const repository = new LeadsRepository();
      await repository.getLeadsForm(hash);

      expect(get).toHaveBeenCalledWith(`${LEADS_BASE}/form/abc%2Bdef/ghi%3D`);
    });
  });
});
