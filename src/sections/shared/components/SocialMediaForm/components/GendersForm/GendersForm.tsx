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

const GendersForm = ({ social, getFieldProps }: Props): React.ReactElement => {
  return (
    <ul className="stats__list">
      {social.genders.map((age, index) => (
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
