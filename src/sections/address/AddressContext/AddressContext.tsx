import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { AddressRepository } from "modules/address/domain/AddressRepository";
import { FullAddress } from "modules/address/domain/Address";
import { HttpResponseInterface } from "@core/domain";
import {
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
} from "modules/address/application/address";

interface ContextState {
  loading: boolean;
  address: FullAddress;
  getAddress: (influencer_id: number) => void;
  createNewAddress: (address: FullAddress) => void;
  updateAddress: (
    address_id: number,
    address: Partial<FullAddress>,
  ) => Promise<HttpResponseInterface<FullAddress>>;
  deleteAddress: (
    address_id: number,
  ) => Promise<HttpResponseInterface<{ success: boolean }>>;
}

export const AddressContext = createContext<ContextState>({} as ContextState);

export const AddressContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: AddressRepository<FullAddress>;
}>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<FullAddress>({} as FullAddress);

  const getAddress = useCallback(
    async (address_id: number) => {
      setLoading(true);
      const response = await getAddressById(repository, address_id);

      if (isHttpSuccessResponse(response)) {
        setAddress(response.data);
        setLoading(false);
      }
      setLoading(false);

      return response;
    },
    [repository],
  );

  const createNewAddress = useCallback(
    async (address: FullAddress) => {
      setLoading(true);
      const response = await createAddress(repository, address);

      if (isHttpSuccessResponse(response)) {
        setAddress(response.data);
        setLoading(false);
      }
      setLoading(false);

      return response;
    },
    [repository],
  );

  const updateAddressMethod = useCallback(
    async (address_id: number, address: Partial<FullAddress>) => {
      setLoading(true);
      const response = await updateAddress(repository, address_id, address);

      if (isHttpSuccessResponse(response)) {
        setAddress(response.data);
        setLoading(false);
      }
      setLoading(false);

      return response;
    },
    [repository],
  );

  const deleteAddressMethod = useCallback(
    async (address_id: number) => {
      setLoading(true);
      const response = await deleteAddress(repository, address_id);

      if (isHttpSuccessResponse(response)) {
        setLoading(false);
      }
      setLoading(false);

      return response;
    },
    [repository],
  );

  return (
    <AddressContext.Provider
      value={{
        loading,
        address,
        getAddress,
        createNewAddress,
        updateAddress: updateAddressMethod,
        deleteAddress: deleteAddressMethod,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
