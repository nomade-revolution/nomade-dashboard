import { HttpResponseInterface } from "@core";

export interface ContactRepository<I> {
  getContactTypes(): Promise<HttpResponseInterface<I>>;
}
