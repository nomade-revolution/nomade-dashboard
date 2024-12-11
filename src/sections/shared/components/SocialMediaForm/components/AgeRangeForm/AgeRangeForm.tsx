import {
  AgeRangeSocialRequest,
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

const initialAgeRange: AgeRangeSocialRequest[] = [
  { age_range_id: 0, followers_percentage: 0, id: 0, name: "13-17" },
  { age_range_id: 0, followers_percentage: 0, id: 0, name: "17-24" },
  { age_range_id: 0, followers_percentage: 0, id: 0, name: "24-35" },
  { age_range_id: 0, followers_percentage: 0, id: 0, name: "36-45" },
  { age_range_id: 0, followers_percentage: 0, id: 0, name: "46-54" },
  { age_range_id: 0, followers_percentage: 0, id: 0, name: "55-67" },
];
const AgeRangeForm = ({ social, getFieldProps }: Props): React.ReactElement => {
  return (
    <ul className="stats__list">
      {social.ageRanges.length < 0 &&
        social.ageRanges.map((age, index) => (
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
                {...getFieldProps(`ageRanges[${index}].followers_percentage`)}
              />
            </div>
          </li>
        ))}
      {social.ageRanges.length === 0 &&
        initialAgeRange.map((age, index) => (
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
                {...getFieldProps(`ageRanges[${index}].followers_percentage`)}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default AgeRangeForm;
