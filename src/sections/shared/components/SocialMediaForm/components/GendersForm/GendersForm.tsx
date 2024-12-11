import {
  SocialMedia,
  SocialMediaStatistic,
} from "@influencer/domain/InfluencerSocialMedia";
import { Field, FieldConfig, FieldInputProps, FormikValues } from "formik";

interface Props {
  social: SocialMedia;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
}
const initialValue = [
  {
    id: 0,
    name: "Hombre",
    followers_percentage: 0,
  },
  {
    id: 0,
    name: "Mujer",
    followers_percentage: 0,
  },
];

const GendersForm = ({ social, getFieldProps }: Props): React.ReactElement => {
  return (
    <ul className="stats__list">
      {social.genders.length > 0 &&
        social.genders.map((age, index) => (
          <li className="stats__list-item">
            <span className="stats__list-text">
              {(age as SocialMediaStatistic).name}
            </span>
            <div className="form-subsection">
              <label
                htmlFor={`percentage-${index}`}
                className="form-subsection__label"
              >
                Porcentaje
              </label>
              <Field
                type="number"
                id={`percentage-${index}`}
                className="stats__field"
                placeholder="0"
                {...getFieldProps(`genders[${index}].followers_percentage`)}
              />
            </div>
          </li>
        ))}
      {social.genders.length === 0 &&
        initialValue.map((age, index) => (
          <li className="stats__list-item">
            <span className="stats__list-text">
              {(age as SocialMediaStatistic).name}
            </span>
            <div className="form-subsection">
              <label
                htmlFor={`percentage-${index}`}
                className="form-subsection__label"
              >
                Porcentaje
              </label>
              <Field
                type="number"
                id={`percentage-${index}`}
                className="stats__field"
                placeholder="0"
                {...getFieldProps(`genders[${index}].followers_percentage`)}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default GendersForm;
