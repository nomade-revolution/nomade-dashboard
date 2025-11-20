import { HttpResponseInterface } from "@core/domain";
import { FullAddress } from "../domain/Address";
import { AddressRepository } from "../domain/AddressRepository";

export const getAddressById = (
  addressRepo: AddressRepository<FullAddress>,
  address_id: number,
): Promise<HttpResponseInterface<FullAddress>> => {
  return addressRepo.getAddressById(address_id);
};

export const createAddress = (
  addressRepo: AddressRepository<FullAddress>,
  address: FullAddress,
): Promise<HttpResponseInterface<FullAddress>> => {
  return addressRepo.createAddress(address);
};

export const updateAddress = (
  addressRepo: AddressRepository<FullAddress>,
  address_id: number,
  address: Partial<FullAddress>,
): Promise<HttpResponseInterface<FullAddress>> => {
  return addressRepo.updateAddress(address_id, address);
};

export const deleteAddress = (
  addressRepo: AddressRepository<FullAddress>,
  address_id: number,
): Promise<HttpResponseInterface<{ success: boolean }>> => {
  return addressRepo.deleteAddress(address_id);
};
