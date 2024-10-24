import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { OfferFormStructure } from "modules/offers/domain/Offer";
import { initialValues, offerSchema } from "./utils/validations";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import { categories, locationTypes } from "./utils/options";
import { useEffect, useState } from "react";
import { useCitiesContext } from "sections/city/CityContext/useCitiesContext";
import { useCountryContext } from "sections/country/CountryContext/useCountryContext";
import {
  OptionsStructure,
  FilterParams,
} from "sections/shared/interfaces/interfaces";

const OffersForm = (): React.ReactElement => {
  const { getAllCountries, countries } = useCountryContext();
  const { cities, getAllCities } = useCitiesContext();
  const [countriesFormat, setCountriesFormat] = useState<OptionsStructure[]>(
    [],
  );
  const [citiesFormat, setCitiesFormat] = useState<OptionsStructure[]>([]);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSubmitForm = async (
    values: OfferFormStructure,
    { setSubmitting }: FormikHelpers<OfferFormStructure>,
  ) => {
    setSubmitting(true);
    values.conditions.at(0);
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={offerSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Oferta</h3>
          <div className="datasheet-form__content">
            <div className="form-subsection">
              <label htmlFor="name" className="form-subsection__label">
                Empresa
              </label>
              <Field
                type="text"
                id="name"
                className="form-subsection__field-large"
                aria-label="Nombre del laboratorio"
                {...getFieldProps("company")}
              />
              {errors.description && touched.description && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="name"
                />
              )}
            </div>
            <section className="datasheet-form__section">
              <div className="form-subsection">
                <label htmlFor="name" className="form-subsection__label">
                  Descripción
                </label>
                <Field
                  type="text"
                  id="name"
                  className="form-subsection__field-textarea--offer"
                  aria-label="Nombre del laboratorio"
                  as={"textarea"}
                  {...getFieldProps("name")}
                />
                {errors.description && touched.description && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="name"
                  />
                )}
              </div>
              <div className="form-subsection">
                <label htmlFor="surname" className="form-subsection__label">
                  Condiciones
                </label>
                <Field
                  type="text"
                  id="surname"
                  className="form-subsection__field-textarea--offer"
                  aria-label="Alias"
                  as={"textarea"}
                  {...getFieldProps("surname")}
                />
                {errors.conditions && touched.conditions && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="surname"
                  />
                )}
              </div>
            </section>
            <section className="datasheet-form__section">
              <div className="form-subsection">
                <label htmlFor="phone" className="form-subsection__label">
                  A cambio
                </label>
                <Field
                  type="phone"
                  id="phone"
                  as={"textarea"}
                  className="form-subsection__field-textarea--offer"
                  aria-label="Correo electrónico"
                  {...getFieldProps("phone")}
                />
                {errors.in_exchange && touched.in_exchange && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="email"
                  />
                )}
              </div>
              <div className="form-subsection">
                <label htmlFor="email" className="form-subsection__label">
                  Categoría
                </label>
                <ReusableSelect
                  label="Categorías"
                  options={categories}
                  setValue={setCategory}
                  value={category}
                />
                {errors.offer_category_id && touched.offer_category_id && (
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
                <label htmlFor="type_id" className="form-subsection__label">
                  Localización
                </label>
                <ReusableSelect
                  label="Localización"
                  options={locationTypes}
                  setValue={setLocation}
                  value={location}
                />
                {errors.location_id && touched.location_id && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="type_id"
                  />
                )}
              </div>

              <div className="form-subsection">
                <label htmlFor="type_id" className="form-subsection__label">
                  País
                </label>
                <ReusableSelect
                  label="País"
                  options={countriesFormat}
                  setValue={setCountry}
                  value={country}
                />
                {errors.location_id && touched.location_id && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="type_id"
                  />
                )}
              </div>
              {location === "App/Models/City" && (
                <div className="form-subsection">
                  <label htmlFor="type_id" className="form-subsection__label">
                    Ciudad
                  </label>
                  <ReusableSelect
                    label="Ciudad"
                    options={citiesFormat}
                    setValue={setCity}
                    value={city}
                  />
                  {errors.location_id && touched.location_id && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="type_id"
                    />
                  )}
                </div>
              )}
            </section>
          </div>

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

export default OffersForm;
