import { useState } from "react";

import { useUserContext } from "../UserContext/useUserContext";

export const enum FormStatus {
  Loading,
  Success,
  Error,
  Initial,
}

export function useLoginForm(): {
  formStatus: FormStatus;
  submitForm: (user: { email: string; password: string }) => void;
  resetFormStatus: () => void;
} {
  const [formStatus, setFormStatus] = useState(FormStatus.Initial);
  const { loginUser } = useUserContext();

  function submitForm({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setFormStatus(FormStatus.Loading);

    try {
      loginUser({ email, password });
      setFormStatus(FormStatus.Success);
    } catch (error) {
      setFormStatus(FormStatus.Error);
    }
  }

  function resetFormStatus() {
    setFormStatus(FormStatus.Initial);
  }

  return {
    formStatus,
    submitForm,
    resetFormStatus,
  };
}
