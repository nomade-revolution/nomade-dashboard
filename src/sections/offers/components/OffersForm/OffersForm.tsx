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
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import CustomFileInput from "sections/shared/components/CustomFileInput/CustomFileInput";
import {
  BRAND_OFFER_ID,
  LODGING_OFFER_ID,
  RESTAURANT_OFFER_ID,
  DELIVERY_OFFER_ID,
  ACTIVITY_OFFER_ID,
} from "sections/offers/utils/offersCategories";
import OffersScheduling from "../OffersScheduling/OffersScheduling";
import { Company } from "modules/user/domain/User";

const OffersForm = (): React.ReactElement => {
  const { getAllCountries, countries } = useCountryContext();
  const { cities, getAllCities } = useCitiesContext();
  const { companies, getCompaniesWithParams } = useCompanyContext();

  const [companySearch, setCompanySearch] = useState<string>("");
  const [company, setCompany] = useState<Company>({} as Company);
  const [countriesFormat, setCountriesFormat] = useState<OptionsStructure[]>(
    [],
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [citiesFormat, setCitiesFormat] = useState<OptionsStructure[]>([]);
  const [file, setFile] = useState<File[] | null>(null);
  const [address, setAddress] = useState<string>("");

  const [formState, setFormState] = useState<{
    country: string;
    city: string;
    location: string;
    category: string;
    offerable_type: string;
  }>({
    country: "",
    city: "",
    location: "",
    category: "",
    offerable_type: "",
  });

  const handleFormStateChange = (field: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmitForm = async (
    values: OfferFormStructure,
    { setSubmitting }: FormikHelpers<OfferFormStructure>,
  ) => {
    setSubmitting(true);
    values.conditions.at(0);
    setSubmitting(false);
  };

  const handleCompanySelect = (companyName: string) => {
    setCompanySearch(companyName);
    setShowSuggestions(false);
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
  }, [countries]);

  useEffect(() => {
    const filters: FilterParams = {
      country_id: formState.country,
    };
    setFormState((prev) => ({ ...prev, city: "" }));
    getAllCities(filters);
  }, [formState.country, getAllCities]);

  useEffect(() => {
    const citiesArr: OptionsStructure[] = cities.map((city) => ({
      id: city.id,
      name: city.name,
      value: city.id,
    }));

    setCitiesFormat(citiesArr);
  }, [cities, countries]);

  useEffect(() => {
    const filters: FilterParams = { filters: { search: companySearch } };

    if (companySearch) {
      getCompaniesWithParams(filters);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [companySearch, getCompaniesWithParams]);

  useEffect(() => {
    switch (+formState.category) {
      case RESTAURANT_OFFER_ID:
        handleFormStateChange(
          "offerable_type",
          "App/Models/OfferableRestaurant",
        );
        break;
      case BRAND_OFFER_ID:
        handleFormStateChange("offerable_type", "App/Models/OfferableBrand");
        break;
      case LODGING_OFFER_ID:
        handleFormStateChange("offerable_type", "App/Models/OfferableLodging");
        break;
      case DELIVERY_OFFER_ID:
        handleFormStateChange("offerable_type", "App/Models/OfferableActivity");
        break;
      case ACTIVITY_OFFER_ID:
        handleFormStateChange("offerable_type", "App/Models/OfferableDelivery");
        break;
    }
  }, [formState.category, formState.offerable_type]);

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
                className="form-subsection__field-large--offer"
                aria-label="Nombre del laboratorio"
                {...getFieldProps("company")}
                value={companySearch}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCompanySearch(event.target.value);
                  setShowSuggestions(true);
                }}
              />
              {showSuggestions && companySearch && (
                <ul className="datasheet-form__suggestions-dropdown">
                  {companies.length > 0 ? (
                    companies.map((suggestion) => (
                      <li key={suggestion.id}>
                        <button
                          onClick={() => {
                            handleCompanySelect(suggestion.company);
                            setCompany(suggestion);
                          }}
                        >
                          {suggestion.company}
                        </button>
                      </li>
                    ))
                  ) : (
                    <span>No se han encontrado resultados</span>
                  )}
                </ul>
              )}
              {errors.description && touched.description && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="name"
                />
              )}
            </div>
            <div className="form-offer">
              <section className="form-offer__texts">
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
              </section>
              <section className="datasheet-form__section">
                <section className="form-offer__select-data">
                  <div className="form-offer__selects">
                    <div className="form-subsection">
                      <label htmlFor="email" className="form-subsection__label">
                        Categoría
                      </label>
                      <ReusableSelect
                        label="Categorías"
                        options={categories}
                        setValue={(value) =>
                          handleFormStateChange("category", value)
                        }
                        value={formState.category}
                      />
                      {errors.offer_category_id &&
                        touched.offer_category_id && (
                          <ErrorMessage
                            className="form-subsection__error-message"
                            component="span"
                            name="email"
                          />
                        )}
                    </div>
                    <section className="datasheet-form__section">
                      <div className="form-subsection">
                        <label
                          htmlFor="type_id"
                          className="form-subsection__label"
                        >
                          Localización
                        </label>
                        <ReusableSelect
                          label="Localización"
                          options={locationTypes}
                          setValue={(value) =>
                            handleFormStateChange("location", value)
                          }
                          value={formState.location}
                        />
                        {errors.location_id && touched.location_id && (
                          <ErrorMessage
                            className="form-subsection__error-message"
                            component="span"
                            name="type_id"
                          />
                        )}
                      </div>
                      <section className="form-offer__locations">
                        <div className="form-subsection">
                          <label
                            htmlFor="type_id"
                            className="form-subsection__label"
                          >
                            País
                          </label>
                          <ReusableSelect
                            label="País"
                            options={countriesFormat}
                            setValue={(value) =>
                              handleFormStateChange("country", value)
                            }
                            value={formState.country}
                          />
                          {errors.company_id && touched.company_id && (
                            <ErrorMessage
                              className="form-subsection__error-message"
                              component="span"
                              name="type_id"
                            />
                          )}
                        </div>
                        {formState.location === "App/Models/City" && (
                          <div className="form-subsection">
                            <label
                              htmlFor="type_id"
                              className="form-subsection__label"
                            >
                              Ciudad
                            </label>
                            <ReusableSelect
                              label="Ciudad"
                              options={citiesFormat}
                              setValue={(value) =>
                                handleFormStateChange("city", value)
                              }
                              value={formState.city}
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
                    </section>
                  </div>
                  <div className="form-subsection">
                    <CustomFileInput setFile={setFile} file={file!} multiple />
                  </div>
                  <OffersScheduling
                    category={+formState.category}
                    errors={errors}
                    getFieldProps={getFieldProps}
                    touched={touched}
                    company={company}
                    address={address}
                    setAddress={setAddress}
                  />
                </section>
              </section>
            </div>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="form-actions__button"
            >
              {isSubmitting ? "Loading..." : "Enviar"}
            </button>
          </div>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default OffersForm;
