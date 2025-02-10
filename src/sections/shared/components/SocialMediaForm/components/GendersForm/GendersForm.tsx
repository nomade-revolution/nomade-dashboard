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
const initialValue: SocialMediaStatistic[] = [
  {
    id: 1,
    name: "Hombre",
    followers_percentage: 0,
  },
  {
    id: 2,
    name: "Mujer",
    followers_percentage: 0,
  },
];

const GendersForm = ({ social, getFieldProps }: Props): React.ReactElement => {
  return (
    <ul className="stats__list" style={{ width: "60%" }}>
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
                className="select--small"
                placeholder="0"
                {...getFieldProps(`genders[${index}].followers_percentage`)}
                value={
                  getFieldProps(`genders[${index}].followers_percentage`)
                    .value || ""
                }
              />
            </div>
          </li>
        ))}
      {social.genders.length === 0 &&
        initialValue.map((age, index) => (
          <li className="stats__list-item" key={age.id}>
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
                className="select--small"
                placeholder="0"
                {...getFieldProps(`genders[${index}].followers_percentage`)}
                value={
                  getFieldProps(`genders[${index}].followers_percentage`)
                    .value || ""
                }
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default GendersForm;
