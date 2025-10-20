import * as yup from "yup";
const editCollabValitaionScheme = yup.object().shape({
  note: yup.string(),
  company_notes: yup.string().max(1000, "Máximo 1000 caracteres"),
});

export default editCollabValitaionScheme;
