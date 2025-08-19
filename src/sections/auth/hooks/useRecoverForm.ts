import { useAuthContext } from "../AuthContext/useAuthContext";

const useRecoverForm = () => {
  const { recoverPassword } = useAuthContext();
  const sendForm = async ({ email }: { email: string }) => {
    try {
      const response = await recoverPassword(email);
      return response;
    } catch (error) {
      return false;
    }
  };

  return { sendForm };
};

export default useRecoverForm;
