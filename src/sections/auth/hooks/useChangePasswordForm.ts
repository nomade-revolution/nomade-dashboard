import { useAuthContext } from "../AuthContext/useAuthContext";

const useChangePasswordForm = () => {
  const { changePassword } = useAuthContext();
  const sendForm = async (
    password: string,
    newPassword: string,
    repeatNewPassword: string,
  ) => {
    const response = await changePassword(
      password,
      newPassword,
      repeatNewPassword,
    );
    return response;
  };

  return { sendForm };
};

export default useChangePasswordForm;
