import { HttpResponseInterface } from "@core";

export interface AddressRepository<I> {
  getAddressById(address_id: number): Promise<HttpResponseInterface<I>>;
  createAddress(address: I): Promise<HttpResponseInterface<I>>;
  updateAddress(
    address_id: number,
    address: Partial<I>,
  ): Promise<HttpResponseInterface<I>>;
  deleteAddress(
    address_id: number,
  ): Promise<HttpResponseInterface<{ success: boolean }>>;
}
