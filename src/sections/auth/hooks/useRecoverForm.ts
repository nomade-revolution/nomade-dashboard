import { useAuthContext } from "../AuthContext/useAuthContext";

const useRecoverForm = () => {
  const { recoverPassword } = useAuthContext();
  const sendForm = async ({ email }: { email: string }) => {
    const response = await recoverPassword(email);
    return response;
  };

  return { sendForm };
};

export default useRecoverForm;
