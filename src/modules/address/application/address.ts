import { HttpResponseInterface } from "@core/domain";
import { FullAddress } from "../domain/Address";
import { AddressRepository } from "../domain/AddressRepository";

export const getAddressById = (
  addressRepo: AddressRepository<FullAddress>,
  address_id: number,
): Promise<HttpResponseInterface<FullAddress>> => {
  return addressRepo.getAddressById(address_id);
};
