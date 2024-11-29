import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import {
  Formik,
  Field,
  ErrorMessage,
  FormikHelpers,
  FormikErrors,
  FormikTouched,
} from "formik";
import {
  FullOffer,
  OfferableActivity,
  OfferableBrand,
  OfferableDelivery,
  OfferableLodging,
  OfferableRestaurant,
  OfferFormStructure,
  SelectedDay,
  WeekDay,
} from "modules/offers/domain/Offer";
import { initialData, offerSchema } from "./utils/validations";
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
import OfferResume from "../OfferResume/OfferResume";
import useOffers from "sections/offers/hooks/useOffers";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
// import { useNavigate } from "react-router-dom";
import Loader from "sections/shared/components/Loader/Loader";
import { Calendar } from "modules/offers/domain/OfferCalendar";
import formatOfferResume from "sections/offers/utils/formatOfferResume";
import formatOfferScheduling from "sections/offers/utils/formatOfferScheduling";

interface Props {
  offer?: FullOffer;
  onSubmit: (offer: FormData, id?: number) => void;
}

const OffersForm = ({ offer, onSubmit }: Props): React.ReactElement => {
  const { getAllCountries, countries } = useCountryContext();
  const { cities, getAllCities } = useCitiesContext();
  const { companies, getCompaniesWithParams } = useCompanyContext();
  const { isSuccess, error } = useOffersContext();
  const { handleOfferFormData } = useOffers();

  // const navigate = useNavigate();
  const offerResumeFormat = formatOfferResume(offer!);

  const [companySearch, setCompanySearch] = useState<string>(
    offer?.company ?? "",
  );
  const [company, setCompany] = useState<Company>({} as Company);
  const [countriesFormat, setCountriesFormat] = useState<OptionsStructure[]>(
    [],
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [citiesFormat, setCitiesFormat] = useState<OptionsStructure[]>([]);
  const [file, setFile] = useState<File[] | []>([]);
  const [offerResume, setOfferResume] = useState<
    | OfferableRestaurant[]
    | OfferableLodging[]
    | OfferableActivity[]
    | OfferableDelivery
    | object
  >(offer ? offerResumeFormat : []);

  const [formState, setFormState] = useState<{
    country: string;
    city: string;
    location: string;
    category: string;
    offerable_type: string;
    address: string;
  }>({
    country:
      offer && offer.location_type === "App\\Models\\Country"
        ? String(offer.location_id)
        : "",
    city: "",
    location: offer ? offer.location_type : "",
    category: offer ? String(offer?.offer_category_id) : "",
    offerable_type: "",
    address: offer?.calendar
      ? String((offer?.calendar as Calendar[])[0]?.address_id)
      : offer?.addresses
        ? String(offer?.addresses[0]?.address_id)
        : "",
  });

  const [schedulingState, setSchedulingState] = useState<{
    restaurant: OfferableRestaurant[];
    delivery: OfferableDelivery;
    activity: OfferableActivity[];
    brand: object;
    lodging: OfferableLodging[];
  }>({
    restaurant:
      offer?.offer_category_id === RESTAURANT_OFFER_ID
        ? ((
            offerResumeFormat as OfferableRestaurant[][]
          )[0] as OfferableRestaurant[])
        : [],
    delivery:
      offer?.offer_category_id === DELIVERY_OFFER_ID
        ? (offerResumeFormat! as OfferableDelivery[])[0]
        : ({} as OfferableDelivery),
    activity:
      offer?.offer_category_id === ACTIVITY_OFFER_ID
        ? ((
            offerResumeFormat as OfferableActivity[][]
          )[0] as OfferableActivity[])
        : [],
    brand: {},
    lodging:
      offer?.offer_category_id === LODGING_OFFER_ID
        ? ((offerResumeFormat as OfferableLodging[][])[0] as OfferableLodging[])
        : [],
  });

  const [week, setWeek] = useState<WeekDay[]>([]);
  const [selectedDays, setSelectedDays] = useState<SelectedDay[]>(
    offer ? (formatOfferScheduling(schedulingState)[0] as SelectedDay[]) : [],
  );

  const handleFormStateChange = (field: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleOfferResumeChange = (
    updatedResume:
      | OfferableRestaurant[]
      | OfferableLodging[]
      | OfferableActivity[]
      | OfferableDelivery
      | object,
  ) => {
    setOfferResume(updatedResume);
  };

  const handleSchedulingStateChange = (
    field: string,
    value:
      | OfferableRestaurant[]
      | OfferableActivity[]
      | OfferableDelivery
      | OfferableLodging[],
  ) => {
    setSchedulingState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmitForm = async (
    values: OfferFormStructure,
    { setSubmitting }: FormikHelpers<OfferFormStructure>,
  ) => {
    setSubmitting(true);
    const location_id =
      formState.location === "App\\Models\\Country"
        ? +formState.country
        : +formState.city;

    const formData = handleOfferFormData(
      values,
      offerResume as never,
      formState.offerable_type,
      formState.location,
      location_id,
      true,
      company.id,
      file!,
      +formState.category,
    );

    await onSubmit(formData, offer && offer?.id);

    setSubmitting(false);
  };

  const handleCompanySelect = (companyName: string) => {
    setCompanySearch(companyName);
    setShowSuggestions(false);
  };

  const handleSchedulingStateDelete = () => {
    setSchedulingState({
      activity: [],
      brand: {},
      delivery: {} as OfferableDelivery,
      lodging: [],
      restaurant: [],
    });
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
    const offerTypeMap: { [key: number]: string } = {
      [RESTAURANT_OFFER_ID]: "App\\Models\\OfferableRestaurant",
      [BRAND_OFFER_ID]: "App\\Models\\OfferableBrand",
      [LODGING_OFFER_ID]: "App\\Models\\OfferableLodging",
      [DELIVERY_OFFER_ID]: "App\\Models\\OfferableDelivery",
      [ACTIVITY_OFFER_ID]: "App\\Models\\OfferableActivity",
    };

    if (formState.category) {
      handleFormStateChange(
        "offerable_type",
        offerTypeMap[+formState.category],
      );
    }
  }, [formState.category]);

  useEffect(() => {
    const offerSchedule = Object.values(schedulingState).find((state) => {
      return Array.isArray(state) && state.length > 0;
    });

    switch (+formState.category) {
      case BRAND_OFFER_ID:
        setOfferResume({});
        break;
      case DELIVERY_OFFER_ID:
        setOfferResume(schedulingState["delivery"]);
        break;
      default:
        setOfferResume(offerSchedule as never);
        break;
    }
  }, [formState.category, schedulingState]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setTimeout(() => navigate(0), 2000);
  //   }
  // }, [isSuccess, navigate]);

  const initialValues = {
    ...initialData,
    ...offer,
  };

  return (
    <Formik
      initialValues={initialValues as OfferFormStructure}
      validationSchema={offerSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Oferta</h3>
          <div className="datasheet-form__content">
            <div className="form-subsection">
              <label htmlFor="company" className="form-subsection__label">
                Cliente
              </label>
              <Field
                type="text"
                id="company"
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
              {errors.company_id && touched.company_id && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="company"
                />
              )}
            </div>
            <div className="form-offer">
              <section className="form-offer__texts">
                <div className="form-subsection">
                  <label
                    htmlFor="description"
                    className="form-subsection__label"
                  >
                    Descripción
                  </label>
                  <Field
                    type="text"
                    id="description"
                    className="form-subsection__field-textarea--offer"
                    aria-label="Nombre del laboratorio"
                    as={"textarea"}
                    {...getFieldProps("description")}
                  />
                  {errors.description && touched.description && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="description"
                    />
                  )}
                </div>
                <div className="form-subsection">
                  <label
                    htmlFor="conditions"
                    className="form-subsection__label"
                  >
                    Condiciones
                  </label>
                  <Field
                    type="text"
                    id="conditions"
                    className="form-subsection__field-textarea--offer"
                    aria-label="Alias"
                    as={"textarea"}
                    {...getFieldProps("conditions")}
                  />
                  {errors.conditions && touched.conditions && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="conditions"
                    />
                  )}
                </div>
                <div className="form-subsection">
                  <label
                    htmlFor="in_exchange"
                    className="form-subsection__label"
                  >
                    A cambio
                  </label>
                  <Field
                    type="in_exchange"
                    id="in_exchange"
                    as={"textarea"}
                    className="form-subsection__field-textarea--offer"
                    aria-label="Correo electrónico"
                    {...getFieldProps("in_exchange")}
                  />
                  {errors.in_exchange && touched.in_exchange && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="in_exchange"
                    />
                  )}
                </div>
                <OfferResume
                  company={company}
                  offerResume={offerResume as never}
                  category={formState.category}
                  offer={offer}
                  onOfferResumeChange={handleOfferResumeChange}
                  setSelectedDays={setSelectedDays}
                  setWeek={setWeek}
                  onSchedulingStateDelete={handleSchedulingStateDelete}
                  schedulingState={schedulingState}
                  setSchedulingState={setSchedulingState}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
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
                          Área
                        </label>
                        <ReusableSelect
                          label="Área"
                          options={locationTypes}
                          setValue={(value) =>
                            handleFormStateChange("location", value)
                          }
                          value={formState.location}
                        />
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
                        </div>
                        {formState.location === "App\\Models\\City" && (
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
                          </div>
                        )}
                      </section>
                    </section>
                  </div>
                  <CustomFileInput
                    setFile={setFile}
                    file={file!}
                    images={offer?.images.map((image) => image.url)}
                    multiple
                  />
                  <OffersScheduling
                    category={+formState.category}
                    errors={
                      errors as FormikErrors<
                        | OfferableRestaurant
                        | OfferableActivity
                        | OfferableBrand
                        | OfferableDelivery
                        | OfferableLodging
                      >
                    }
                    getFieldProps={getFieldProps}
                    touched={
                      touched as FormikTouched<
                        | OfferableRestaurant
                        | OfferableActivity
                        | OfferableBrand
                        | OfferableDelivery
                        | OfferableLodging
                      >
                    }
                    company={company}
                    address={formState.address}
                    setAddress={(value) =>
                      handleFormStateChange("address", value)
                    }
                    handleScheduling={handleSchedulingStateChange}
                    schedulingState={schedulingState}
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}
                    setWeek={setWeek}
                    week={week}
                    offer={offer!}
                    selectedIndex={selectedIndex}
                  />
                </section>
              </section>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !offerResume}
            className={
              isSuccess
                ? "datasheet-form__success"
                : error
                  ? "datasheet-form__error"
                  : "datasheet-form__submit"
            }
          >
            {isSubmitting ? (
              <Loader width="20px" height="20px" />
            ) : isSuccess ? (
              "Oferta creada"
            ) : error ? (
              "Revisa los datos e intentalo de nuevo"
            ) : offer ? (
              "Editar oferta"
            ) : (
              "Crear oferta"
            )}
          </button>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default OffersForm;
