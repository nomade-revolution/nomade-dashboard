import * as yup from "yup";
const changePasswordScheme = yup.object({
  password: yup.string().required("Este campo es obligatorio"),
  repeatPassword: yup.string().required("Este campo es obligatorio"),
  newPassword: yup.string().required("Este campo es obligatorio"),
});
export default changePasswordScheme;
