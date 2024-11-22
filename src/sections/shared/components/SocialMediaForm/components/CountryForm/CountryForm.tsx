import { CountrySocialRequest } from "@influencer/domain/InfluencerSocialMedia";
import { Field, FieldConfig, FieldInputProps, FormikValues } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import { OptionsStructure } from "sections/shared/interfaces/interfaces";

interface CountryFormProps {
  index: number;
  data: CountrySocialRequest;
  countriesFormat: OptionsStructure[];
  onCountryChange: (index: number, countryData: CountrySocialRequest) => void;
  onRemove: () => void;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
}

const CountryForm = ({
  index,
  data,
  countriesFormat,
  onCountryChange,
  onRemove,
  getFieldProps,
}: CountryFormProps): React.ReactElement => {
  const handleCountryChange = (
    field: keyof CountrySocialRequest,
    value: string,
  ) => {
    onCountryChange(index, { ...data, [field]: value });
  };

  return (
    <div className="stats__sub-section">
      <ReusableSelect
        label="Países"
        options={countriesFormat}
        value={String(data.country_id ? data.country_id : data.id)}
        setValue={(value) => handleCountryChange("country_id", value)}
      />
      <div className="form-subsection">
        <label htmlFor="percentage" className="form-subsection__label">
          Porcentaje
        </label>
        <Field
          type="number"
          id="percentage"
          className="stats__field"
          placeholder="0"
          {...getFieldProps(`countries[${index}].followers_percentage`)}
        />
      </div>
      <button type="button" onClick={onRemove} className="remove-city-button">
        <FaTrashAlt color="red" size={18} />
      </button>
    </div>
  );
};

export default CountryForm;
