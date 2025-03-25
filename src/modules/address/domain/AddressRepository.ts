import { HttpResponseInterface } from "@core";

export interface AddressRepository<I> {
  getAddressById(address_id: number): Promise<HttpResponseInterface<I>>;
  createAddress(address: I): Promise<HttpResponseInterface<I>>;
}
