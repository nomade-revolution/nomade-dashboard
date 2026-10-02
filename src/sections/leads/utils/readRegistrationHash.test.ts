import { readRegistrationHash } from "./readRegistrationHash";

describe("Given readRegistrationHash", () => {
  const hash = "abc+def/ghi=";

  describe("When the query contains that hash", () => {
    test("Then an unencoded hash and its encodeURIComponent form resolve to the same value", () => {
      const unencoded = readRegistrationHash(`?hash=${hash}&next=1`);
      const encoded = readRegistrationHash(
        `?other=1&hash=${encodeURIComponent(hash)}`,
      );

      expect(unencoded).toBe(hash);
      expect(encoded).toBe(hash);
      expect(unencoded).toBe(encoded);
    });
  });

  describe("When the query has no hash", () => {
    test("Then it should return null", () => {
      expect(readRegistrationHash("")).toBeNull();
      expect(readRegistrationHash("?foo=1")).toBeNull();
      expect(readRegistrationHash("?hash=")).toBeNull();
    });
  });
});
