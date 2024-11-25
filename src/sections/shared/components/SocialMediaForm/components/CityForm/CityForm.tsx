import {
  CitySocialRequest,
  CountrySocialRequest,
} from "@influencer/domain/InfluencerSocialMedia";
import { Field, FieldConfig, FieldInputProps, FormikValues } from "formik";
import { FaTrashAlt } from "react-icons/fa";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import { OptionsStructure } from "sections/shared/interfaces/interfaces";

interface CityFormProps {
  index: number;
  cityData: CitySocialRequest; // Datos de la ciudad
  countryData: CountrySocialRequest; // Datos del país
  countriesFormat: OptionsStructure[]; // Opciones de países
  citiesFormat: OptionsStructure[]; // Opciones de ciudades
  onCityChange: (index: number, cityData: CitySocialRequest) => void;
  onCountryChange: (index: number, countryData: CountrySocialRequest) => void;
  onRemove: () => void;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
}

const CityForm = ({
  index,
  cityData,
  countryData,
  countriesFormat,
  citiesFormat,
  onCityChange,
  onCountryChange,
  onRemove,
  getFieldProps,
}: CityFormProps): React.ReactElement => {
  const handleCityChange = (
    field: keyof CitySocialRequest,
    value: string | number,
  ) => {
    onCityChange(index, { ...cityData, [field]: value });
  };

  const handleCountryChange = (
    field: keyof CountrySocialRequest,
    value: string | number,
  ) => {
    onCountryChange(index, { ...countryData, [field]: value });
  };

  return (
    <div className="stats__sub-section">
      <ReusableSelect
        label="País"
        options={countriesFormat}
        value={String(countryData?.country_id || "")}
        setValue={(value) => {
          handleCityChange("country_id", +value);
          handleCountryChange("country_id", +value);
        }}
      />

      <ReusableSelect
        label="Ciudad"
        options={citiesFormat}
        value={String(cityData.id ? cityData.id : cityData.city_id)}
        setValue={(value) => handleCityChange("city_id", +value)}
      />

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
          {...getFieldProps(`cities[${index}].followers_percentage`)}
        />
      </div>

      <button type="button" onClick={onRemove} className="remove-city-button">
        <FaTrashAlt color="red" size={18} />
      </button>
    </div>
  );
};

export default CityForm;
