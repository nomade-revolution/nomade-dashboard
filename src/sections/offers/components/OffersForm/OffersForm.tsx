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
import OffersScheduling from "../OffersScheduling/OffersScheduling";
import { Company } from "modules/user/domain/User";
// import OfferResume from "../OfferResume/OfferResume";
import useOffers from "sections/offers/hooks/useOffers";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
// import { useNavigate } from "react-router-dom";
import Loader from "sections/shared/components/Loader/Loader";
import { Calendar } from "modules/offers/domain/OfferCalendar";
import formatOfferResume, {
  formatOfferResumeMultiple,
} from "sections/offers/utils/formatOfferResume";
import formatOfferScheduling from "sections/offers/utils/formatOfferScheduling";
import { OfferTypes } from "modules/offers/domain/Offer";
import { Checkbox } from "@mui/material";

interface Props {
  offer?: FullOffer;
  onSubmit: (offer: FormData, id?: number) => void;
  onCancel?: (state: boolean) => void;
}

const OFFER_CATEGORIES_BY_TYPE = {
  Restaurant: 1,
  Activity: 8,
  Lodging: 7,
  Delivery: 5,
  Brand: 6,
};

export interface Addresses {
  id: number;
  name: string;
  value: number;
}

const OffersForm = ({
  offer,
  onSubmit,
  onCancel,
}: Props): React.ReactElement => {
  const { getAllCountries, countries } = useCountryContext();
  const { cities, getAllCities } = useCitiesContext();
  const { companies, getCompaniesWithParams, getCompany } = useCompanyContext();
  const { isSuccess, error, getOfferCategories } = useOffersContext();
  const { handleOfferFormData } = useOffers();

  // const navigate = useNavigate();
  const offerResumeFormat = formatOfferResume(offer!);
  const mode = offer ? "edit" : "create";

  const [categoriesList, setCategoriesList] = useState<
    { id: number; name: string; data: OptionsStructure[] }[]
  >([]);
  const [companySearch, setCompanySearch] = useState<string>(
    offer?.company ?? "",
  );
  const [loaded, setLoaded] = useState<boolean>(false);
  const [company, setCompany] = useState<Company>(
    // @ts-expect-error TODO: fix this
    {},
  );
  const [addresses, setAddresses] = useState<Addresses[]>([]);
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
  const [offerResumeEdit, setOfferResumeEdit] = useState<
    | OfferableRestaurant[]
    | OfferableLodging[]
    | OfferableActivity[]
    | OfferableDelivery
    | object
  >(offer ? formatOfferResumeMultiple(offer!) : []);

  let countryValue = "";
  if (offer) {
    if (offer.location_type === "App\\Models\\Country") {
      countryValue = String(offer.location_id);
    } else if (offer.location_type === "App\\Models\\City") {
      countryValue = String(offer.location_parent_id);
    }
  }

  const [formState, setFormState] = useState<{
    country: string;
    city: string;
    location: string;
    categories: number[];
    type: OfferTypes | string;
    offerable_type: string;
    address: string;
  }>({
    country: countryValue,
    city:
      offer && offer.location_type === "App\\Models\\City"
        ? String(offer.location_id)
        : "",
    location: offer ? offer.location_type : "",
    categories: offer ? offer?.offer_categories?.map((cat) => cat.id) : [],
    type: offer?.type || "",
    offerable_type: "",
    address: offer?.calendar
      ? String((offer?.calendar as Calendar[])[0]?.address_id)
      : offer?.addresses
        ? String(offer?.addresses[0]?.address_id)
        : "",
  });

  const offerType = offer?.type;

  const parseSchedulingState = (selectedIndex?: number | null) => {
    const data: {
      restaurant: OfferableRestaurant[];
      delivery: OfferableDelivery;
      activity: OfferableActivity[];
      brand: object;
      lodging: OfferableLodging[];
    } = {
      restaurant: [],
      // @ts-expect-error TODO: fix this
      delivery: {},
      activity: [],
      brand: [],
      lodging: [],
    };
    if (offerType === OfferTypes.brand || !offerType) return data;

    if (typeof selectedIndex === "number") {
      // @ts-expect-error TODO: fix this
      data[offerType.toLowerCase()] = [offerResumeEdit[selectedIndex]];
    } else {
      // @ts-expect-error TODO: fix this
      data[offerType.toLowerCase()] = offerResumeFormat;
    }

    return data;
  };

  const [schedulingState, setSchedulingState] = useState<{
    restaurant: OfferableRestaurant[];
    delivery: OfferableDelivery;
    activity: OfferableActivity[];
    brand: object;
    lodging: OfferableLodging[];
  }>(parseSchedulingState());

  // console.log(
  //   "el ",
  //   // formatOfferScheduling(schedulingState, offer?.type),
  //   schedulingState,
  // );

  const [week, setWeek] = useState<WeekDay[]>([]);
  const [selectedDays, setSelectedDays] = useState<SelectedDay[]>(
    // @ts-expect-error TODO: fix this
    offer
      ? formatOfferScheduling(
          // @ts-expect-error TODO: fix this
          schedulingState[offer.type.toLowerCase()],
          offer.type,
        )[0]
      : [],
  );

  useEffect(() => {
    if (!offer) return;

    if (offer.calendar) {
      if (Array.isArray(offer.calendar)) {
        setAddresses(
          offer.calendar.map((addr) => {
            return {
              id: addr.address_id,
              name: addr.address,
              value: addr.address_id,
            };
          }),
        );
      } else {
        setAddresses([
          {
            id: offer.calendar.address_id,
            name: offer.calendar.address,
            value: offer.calendar.address_id,
          },
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormStateChange = (field: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  // const handleOfferResumeChange = (
  //   updatedResume:
  //     | OfferableRestaurant[]
  //     | OfferableLodging[]
  //     | OfferableActivity[]
  //     | OfferableDelivery
  //     | object,
  // ) => {
  //   setOfferResume(updatedResume);
  // };

  const handleSchedulingStateChange = (
    field: string,
    value:
      | OfferableRestaurant[]
      | OfferableActivity[]
      | OfferableDelivery
      | OfferableLodging[],
  ) => {
    if (mode === "edit") {
      if (!value || !offer || offer.type === OfferTypes.brand) {
        return;
      }
      if (offer.type === OfferTypes.delivery) {
        setOfferResumeEdit(value);
        return;
      }
      if (
        // @ts-expect-error TODO: fix this
        value.length === 0
      ) {
        return;
      }
      // @ts-expect-error TODO: fix this
      let newValue = value[selectedIndex];
      if (!newValue) {
        // @ts-expect-error TODO: fix this
        newValue = value.pop();
      }
      if (!newValue) {
        return;
      }

      // @ts-expect-error TODO: fix this
      const currentOfferResumeEdit = [...offerResumeEdit];
      const index = currentOfferResumeEdit.findIndex(
        (item) => item.address_id === newValue.address_id,
      );
      if (index !== -1) {
        currentOfferResumeEdit[index] = newValue;
      } else {
        currentOfferResumeEdit.push(newValue);
      }
      setOfferResumeEdit(currentOfferResumeEdit);
    } else {
      setSchedulingState((prevState) => ({ ...prevState, [field]: value }));
    }
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

    const hasAlreadyParentCategory =
      // @ts-expect-error TODO: fix this
      formState.categories[0] === OFFER_CATEGORIES_BY_TYPE[formState.type];

    const offerCategories = hasAlreadyParentCategory
      ? [...formState.categories]
      : // @ts-expect-error TODO: fix this
        [OFFER_CATEGORIES_BY_TYPE[formState.type], ...formState.categories];

    let parsedOfferResume = offerResume as never;
    if (
      offerType === OfferTypes.delivery &&
      // @ts-expect-error TODO: fix this
      offerResume?.length &&
      // @ts-expect-error TODO: fix this
      offerResume[0]
    ) {
      // @ts-expect-error TODO: fix this
      let deliveryData = offerResume[0];
      if (!deliveryData) {
        deliveryData = offerResumeEdit;
      }
      if (deliveryData) {
        parsedOfferResume = {
          // @ts-expect-error TODO: fix this
          advance_notice_time: offerResume[0].advance_notice_time,
          // @ts-expect-error TODO: fix this
          week: offerResume[0].week,
        } as never;
      }
    }
    const offerableData = mode === "edit" ? offerResumeEdit : parsedOfferResume;

    const formData = handleOfferFormData(
      values,
      offerableData as never,
      formState.offerable_type,
      formState.location,
      location_id,
      true,
      company.id,
      file!,
      offerCategories,
    );

    await onSubmit(formData, offer && offer?.id);

    setSubmitting(false);
  };

  const handleCompanySelect = (companyName: string) => {
    setCompanySearch(companyName);
    setShowSuggestions(false);
  };

  // const handleSchedulingStateDelete = () => {
  //   setSchedulingState({
  //     activity: [],
  //     brand: [],
  //     delivery: {} as OfferableDelivery,
  //     lodging: [],
  //     restaurant: [],
  //   });
  // };

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
    if (!formState.type) {
      return;
    }
    (async () => {
      const filtersResponse = await getOfferCategories();

      // @ts-expect-error TODO fix this
      const selectedCatId = OFFER_CATEGORIES_BY_TYPE[formState.type];
      // @ts-expect-error TODO fix this
      const filtersByCategory = filtersResponse.find(
        // @ts-expect-error TODO fix this
        (filter) => filter.id === selectedCatId,
      );

      if (!filtersByCategory?.children?.length) return;

      setCategoriesList(filtersByCategory.children);
    })();
  }, [formState.type, getOfferCategories]);

  useEffect(() => {
    const filters: FilterParams = {
      country_id: formState.country,
    };
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
    // @ts-expect-error TODO fix this
    const offerTypeMap: { [key: OfferTypes]: string } = {
      [OfferTypes.restaurant]: "App\\Models\\OfferableRestaurant",
      [OfferTypes.brand]: "App\\Models\\OfferableBrand",
      [OfferTypes.lodging]: "App\\Models\\OfferableLodging",
      [OfferTypes.delivery]: "App\\Models\\OfferableDelivery",
      [OfferTypes.activity]: "App\\Models\\OfferableActivity",
    };

    if (formState.type) {
      handleFormStateChange(
        "offerable_type",
        // @ts-expect-error TODO fix this
        offerTypeMap[formState.type],
      );
    }
  }, [formState.type]);

  useEffect(() => {
    const offerSchedule = Object.values(schedulingState).find((state) => {
      return Array.isArray(state) && state.length > 0;
    });

    switch (formState.type) {
      case OfferTypes.brand:
        setOfferResume([]);
        break;
      case OfferTypes.delivery:
        setOfferResume(schedulingState["delivery"]);
        break;
      default:
        setOfferResume(offerSchedule as never);
        break;
    }
  }, [formState.type, schedulingState]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setTimeout(() => navigate(0), 2000);
  //   }
  // }, [isSuccess, navigate]);

  const initialValues = {
    ...initialData,
    ...offer,
  };

  useEffect(() => {
    if (offer) {
      setShowSuggestions(false);
    }
  }, [offer]);

  useEffect(() => {
    if (!offer) return;
    if (typeof selectedIndex === "number") {
      const newSchedulingState = parseSchedulingState(selectedIndex);
      setSchedulingState(newSchedulingState);

      const newSelectedDays = formatOfferScheduling(
        // @ts-expect-error TODO: fix this
        newSchedulingState[offer.type.toLowerCase()],
        offer.type,
      )[0];
      setSelectedDays(
        // @ts-expect-error TODO: fix this
        newSelectedDays || [],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const fetchCompanyData = async () => {
    if (offer?.company_id) {
      const companyData = await getCompany(offer.company_id);
      // @ts-expect-error TODO: fix this
      setCompany(companyData.data);
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (loaded) return;
    fetchCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer?.company_id]);

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
                            setAddresses([
                              {
                                id: suggestion.address?.id,
                                name: suggestion.address?.address,
                                value: suggestion.address?.id,
                              },
                            ]);
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

                <div>
                  <h4>Categorías</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {categoriesList?.map((category) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          flex: "1 1 calc(50% - 10px)",
                          boxSizing: "border-box",
                        }}
                        key={category.id}
                      >
                        <Checkbox
                          checked={formState.categories.includes(category.id)}
                          value={category.id}
                          key={category.id}
                          style={{
                            padding: 0,
                          }}
                          onChange={(e) => {
                            if (e.target.checked) {
                              // @ts-expect-error TODO: fix this
                              handleFormStateChange("categories", [
                                ...formState.categories,
                                category.id,
                              ]);
                            } else {
                              handleFormStateChange(
                                "categories",
                                // @ts-expect-error TODO: fix this
                                formState.categories.filter(
                                  (cat) => cat !== category.id,
                                ),
                              );
                            }
                          }}
                        />
                        <label>{category.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* {offerType !== OfferTypes.brand ? (
                  <OfferResume
                    company={company}
                    offerResume={offerResume as never}
                    type={formState.type}
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
                ) : null} */}
              </section>
              <section className="datasheet-form__section">
                <section className="form-offer__select-data">
                  <div className="form-offer__selects">
                    <div className="form-subsection">
                      <label htmlFor="email" className="form-subsection__label">
                        Tipo
                      </label>
                      <ReusableSelect
                        label=""
                        options={categories}
                        setValue={(value) =>
                          handleFormStateChange("type", value)
                        }
                        value={formState.type}
                      />
                      {errors.type && touched.type && (
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
                          label=""
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
                            label=""
                            options={countriesFormat}
                            setValue={(value) => {
                              setFormState((prev) => ({
                                ...prev,
                                country: value,
                                city: "",
                              }));
                            }}
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
                              label=""
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
                    type={formState.type}
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
                    addresses={addresses}
                    setAddresses={setAddresses}
                    address={formState.address}
                    setAddress={(value, index) => {
                      handleFormStateChange("address", value);
                      setSelectedIndex(index);
                    }}
                    handleScheduling={handleSchedulingStateChange}
                    schedulingState={schedulingState}
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}
                    setWeek={setWeek}
                    // @ts-expect-error TODO: fix this
                    week={week}
                    offer={offer!}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                </section>
              </section>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              paddingTop: "20px",
            }}
          >
            <button
              type="submit"
              disabled={
                isSubmitting ||
                (!offerResume && offerType !== OfferTypes.lodging)
                // (!formState.address &&
                //   categoryId !== DELIVERY_OFFER_ID)
              }
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
              ) : isSuccess && offer ? (
                "Oferta editada"
              ) : isSuccess && !offer ? (
                "Oferta creada"
              ) : error ? (
                "Revisa los datos e intentalo de nuevo"
              ) : offer ? (
                "Guardar cambios"
              ) : (
                "Crear oferta"
              )}
            </button>
            {offer && (
              <button
                onClick={() => onCancel && onCancel(false)}
                type="button"
                disabled={isSubmitting}
                className={"datasheet-form__error"}
              >
                Cancelar cambios
              </button>
            )}
          </div>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default OffersForm;
