import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { ContactRepository } from "modules/contact/domain/ContactRepository";
import { getContactTypes } from "modules/contact/application/contact";
import { ContactType } from "modules/contact/domain/Contact";

interface ContextState {
  contact_types: ContactType[];
  loading: boolean;
  error: string | null;
  getAllContactTypes: () => void;
}

export const ContactContext = createContext<ContextState>({} as ContextState);

export const ContactContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{
  repository: ContactRepository<ContactType[]>;
}>) => {
  const [contact_types, setContactTypes] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllContactTypes = useCallback(async () => {
    setLoading(true);
    setError(null);

    const response = await getContactTypes(repository);
    if (isHttpSuccessResponse(response)) {
      setLoading(false);
      setContactTypes(response.data);
    }
  }, [repository]);

  return (
    <ContactContext.Provider
      value={{
        contact_types,
        loading,
        error,
        getAllContactTypes,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
