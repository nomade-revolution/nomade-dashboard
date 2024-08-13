import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { AddressRepository } from "modules/address/domain/AddressRepository";
import { FullAddress } from "modules/address/domain/Address";
import { getAddressById } from "modules/address/application/address";

interface ContextState {
  loading: boolean;
  address: FullAddress;
  getAddress: (influencer_id: number) => void;
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

  return (
    <AddressContext.Provider
      value={{
        loading,
        address,
        getAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
