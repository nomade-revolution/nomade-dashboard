export class AsyncStorageImplementation {
  async set(key: string, value: string): Promise<void> {
    return localStorage.setItem(key, value);
  }

  async get(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}
