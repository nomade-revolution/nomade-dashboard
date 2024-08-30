import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { FullAddress } from "modules/offers/domain/OfferrAddress";
import { addressSchema } from "./validations/validations";
import ReusableSelect from "../ReusableSelect/ReusableSelect";
import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { useCountryContext } from "sections/country/CountryContext/useCountryContext";
import { useEffect, useState } from "react";
import {
  FilterParams,
  OptionsStructure,
} from "sections/shared/interfaces/interfaces";
import { useCitiesContext } from "sections/city/CityContext/useCitiesContext";

interface Props {
  setAddress: (value: FullAddress) => void;
  address: FullAddress;
}

const initialState: FullAddress = {
  address: "",
  address_2: "",
  city_id: "",
  contact_name: "",
  contact_phone: "",
  country_id: 0,
  name: "",
  province: "",
  zip_code: "",
};

const AddressForm = ({ setAddress, address }: Props): React.ReactElement => {
  const { getAllCountries, countries } = useCountryContext();
  const { cities, getAllCities } = useCitiesContext();
  const [countriesFormat, setCountriesFormat] = useState<OptionsStructure[]>(
    [],
  );
  const [citiesFormat, setCitiesFormat] = useState<OptionsStructure[]>([]);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const handleSubmitForm = async (
    values: FullAddress,
    { setSubmitting }: FormikHelpers<FullAddress>,
  ) => {
    setSubmitting(true);
    setAddress({ ...values, city_id: city, country_id: +country });
    setSubmitting(false);
  };

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  useEffect(() => {
    const countriesArr: OptionsStructure[] = countries.map((country) => ({
      id: country.id,
      name: country.name,
      value: country.id,
    }));

    setCountriesFormat(countriesArr);
  }, [countries, country]);

  useEffect(() => {
    const filters: FilterParams = {
      country_id: country,
    };
    setCity("");

    getAllCities(filters);
  }, [country, getAllCities]);

  useEffect(() => {
    const citiesArr: OptionsStructure[] = cities.map((city) => ({
      id: city.id,
      name: city.name,
      value: city.id,
    }));

    setCitiesFormat(citiesArr);
  }, [cities, countries, country]);

  const initialValues = {
    ...initialState,
    ...address,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addressSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Dirección</h3>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="address" className="form-subsection__label">
                Dirección
              </label>
              <Field
                type="text"
                id="address"
                className="form-subsection__field-large"
                aria-label="Nombre del laboratorio"
                {...getFieldProps("address")}
              />
              {errors.address && touched.address && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="address"
                />
              )}
            </div>
          </section>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="address_2" className="form-subsection__label">
                Dirección 2 (opcional)
              </label>
              <Field
                type="text"
                id="address_2"
                className="form-subsection__field"
                aria-label="Alias"
                {...getFieldProps("address_2")}
              />
              {errors.address_2 && touched.address_2 && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="address_2"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="zip_code" className="form-subsection__label">
                Código postal
              </label>
              <Field
                type="text"
                id="zip_code"
                className="form-subsection__field"
                aria-label="Teléfono de contacto"
                {...getFieldProps("zip_code")}
              />
              {errors.zip_code && touched.zip_code && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="zip_code"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="province" className="form-subsection__label">
                Provincia
              </label>
              <Field
                type="province"
                id="province"
                className="form-subsection__field"
                aria-label="Correo electrónico"
                {...getFieldProps("province")}
              />
              {errors.province && touched.province && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="email"
                />
              )}
            </div>
          </section>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="country_id" className="form-subsection__label">
                País
              </label>
              <ReusableSelect
                label="Seleccionar país"
                options={countriesFormat}
                setValue={setCountry}
                value={country}
              />
              {errors.country_id && touched.country_id && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="country_id"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="city_id" className="form-subsection__label">
                Ciudad
              </label>
              <ReusableSelect
                label="Seleccionar ciudad"
                options={citiesFormat}
                setValue={setCity}
                value={city}
              />
              {errors.city_id && touched.city_id && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="city_id"
                />
              )}
            </div>
          </section>

          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label htmlFor="name" className="form-subsection__label">
                Nombre
              </label>
              <Field
                type="text"
                id="name"
                className="form-subsection__field"
                aria-label="Comentarios"
                maxlength="1000"
                {...getFieldProps("name")}
              />
              {errors.name && touched.name && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="name"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="contact_name" className="form-subsection__label">
                Persona de contacto
              </label>
              <Field
                type="text"
                id="name"
                className="form-subsection__field"
                aria-label="Comentarios"
                maxlength="100"
                {...getFieldProps("contact_name")}
              />
              {errors.contact_name && touched.contact_name && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="contact_name"
                />
              )}
            </div>
            <div className="form-subsection">
              <label htmlFor="contact_phone" className="form-subsection__label">
                Teléfono de contacto
              </label>
              <Field
                type="contact_phone"
                id="contact_phone"
                className="form-subsection__field"
                aria-label="Comentarios"
                {...getFieldProps("contact_phone")}
              />
              {errors.contact_phone && touched.contact_phone && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="contact_phone"
                />
              )}
            </div>
          </section>
          <button
            type="submit"
            className="datasheet-form__submit"
            disabled={isSubmitting}
          >
            Guardar
          </button>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default AddressForm;
