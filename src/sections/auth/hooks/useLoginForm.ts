import { useState } from "react";
import { useAuthContext } from "../AuthContext/useAuthContext";

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
  const { loginUser } = useAuthContext();

  function submitForm({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setFormStatus(FormStatus.Loading);

    try {
      const resp = loginUser({ email, password });
      setFormStatus(FormStatus.Success);
      return resp;
    } catch (error) {
      setFormStatus(FormStatus.Error);
      return false;
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
