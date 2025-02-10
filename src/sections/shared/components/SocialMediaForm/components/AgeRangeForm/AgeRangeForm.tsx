import {
  SocialMedia,
  SocialMediaStatistic,
} from "@influencer/domain/InfluencerSocialMedia";
import { Field, FieldConfig, FieldInputProps, FormikValues } from "formik";
import ageRanges from "./ageRanges";

interface Props {
  social: SocialMedia;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
}

const initialAgeRange: SocialMediaStatistic[] = ageRanges;
const AgeRangeForm = ({ social, getFieldProps }: Props): React.ReactElement => {
  return (
    <ul className="stats__list" style={{ width: "60%" }}>
      {social.ageRanges.length > 0 &&
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
                className="select--small"
                placeholder="0"
                {...getFieldProps(`ageRanges[${index}].followers_percentage`)}
                value={
                  getFieldProps(`ageRanges[${index}].followers_percentage`)
                    .value || ""
                }
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
                className="select--small"
                placeholder="0"
                {...getFieldProps(`ageRanges[${index}].followers_percentage`)}
                value={
                  getFieldProps(`ageRanges[${index}].followers_percentage`)
                    .value || ""
                }
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default AgeRangeForm;
