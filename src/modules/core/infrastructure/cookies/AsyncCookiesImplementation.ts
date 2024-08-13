import Cookies from "js-cookie";

export class AsyncCookiesImplementation {
  private readonly defaultExpirationTime: number = 7;

  async set(key: string, value: string, expires?: number): Promise<void> {
    Cookies.set(key, value, { expires: expires || this.defaultExpirationTime });
  }

  async get(key: string): Promise<string | undefined> {
    return Cookies.get(key);
  }

  async remove(key: string): Promise<void> {
    Cookies.remove(key);
  }
}
