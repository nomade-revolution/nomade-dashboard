import * as yup from "yup";
const editCollabValitaionScheme = yup.object().shape({
  note: yup.string(),
});

export default editCollabValitaionScheme;
