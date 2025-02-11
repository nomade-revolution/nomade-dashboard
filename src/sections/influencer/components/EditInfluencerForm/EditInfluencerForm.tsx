/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import Loader from "sections/shared/components/Loader/Loader";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import CreateInfluencerFormStyled from "sections/user/pages/CreateInfluencerPage/CreateInfluencerFormStyled";
import { useCitiesContext } from "sections/city/CityContext/useCitiesContext";
import { useCountryContext } from "sections/country/CountryContext/useCountryContext";
import { City } from "modules/user/domain/User";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import { Influencer } from "@influencer";
import { editInfluencerScheme } from "./utils/validations/validations";
// import CustomFileInput from "sections/shared/components/CustomFileInput/CustomFileInput";
// import ActionButton from "sections/shared/components/ActionButton/ActionButton";

interface Props {
  initialState: Influencer;
  onSubmit: () => void;
}

interface EditInfluencerFormState {
  prefix: string;
  phone: string;
  from_country_id: number;
  from_city_id: number;
  living_country_id: number;
  living_city_id: number;
}

const EXCLUDED_KEYS = [
  "categories",
  "avatar",
  "socialMedia",
  "gender",
  "ageRanges",
];

const EditInfluencerForm = ({ initialState, onSubmit }: Props) => {
  const [formState, setFormState] = useState<EditInfluencerFormState | null>(
    null,
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { modifyInfluencer } = useInfluencerContext();
  const [loading, setIsLoading] = useState<boolean>(false);
  const { getAllCities } = useCitiesContext();
  const { countries, getAllCountries } = useCountryContext();
  // const [countriesStats, setCountriesStates] =
  //   useState<string[]>(DEFAULT_STATS);
  // const [citiesStats, setCitiesStates] = useState<string[]>(DEFAULT_STATS);
  // const [mainSocial, setMainSocial] = useState<number>(0);
  const [citiesBorn, setCitiesBorn] = useState<City[]>([]);
  const [citiesLive, setCitiesLive] = useState<City[]>([]);
  // const [countryForCityStats, setCountryForCityStats] = useState<number>(0);
  const [bornCity, setBornCity] = useState<number>(0);
  const [liveCity, setLiveCity] = useState<number>(0);
  const [bornCountry, setBornCountry] = useState<number>(0);
  const [liveCountry, setLiveCountry] = useState<number>(0);
  // const [socialMediaSelected, setSocialMediaSelected] = useState<number>(0);
  // const [file, setFile] = useState<File[]>([]);
  // const [citiesPerPercentage, setCitiesPerPercentage] = useState<City[]>([]);
  const [category, setCategory] = useState<number>(0);
  const [subcategory, setSubcategory] = useState<number>(0);
  const {
    influencerCategories,
    parentInfluencerCategories,
    getInfluencerCategories,
  } = useInfluencerContext();
  // const [socials, setSocials] = useState<number[]>([]);

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInitialData = async () => {
    const fromCountry = initialState.from_country?.id || 0;
    const fromCity = initialState.from_city?.id || 0;
    const livingCountry = initialState.living_country?.id || 0;
    const livingCity = initialState.living_city?.id || 0;

    const parsedInitialState: EditInfluencerFormState = {
      prefix: initialState.prefix,
      phone: initialState.phone,
      from_country_id: fromCountry,
      from_city_id: fromCity,
      living_country_id: livingCountry,
      living_city_id: livingCity,
    };

    setFormState(parsedInitialState);

    if (initialState.categories?.length) {
      setCategory(initialState.categories[0].id);
      setSubcategory(initialState.categories[1].id);
    }

    if (fromCountry) {
      setBornCountry(fromCountry);
      getCitiesFromCountry(fromCountry, "born");
    }
    setBornCity(fromCity);

    if (livingCountry) {
      setLiveCountry(livingCountry);
      getCitiesFromCountry(livingCountry, "live");
    }
    setLiveCity(livingCity);
  };

  const getCitiesFromCountry = async (
    countryId: number,
    type: "born" | "live" | "stats",
  ) => {
    const resp = await getAllCities({ country_id: countryId });
    if (type === "born") {
      setCitiesBorn((resp as any).data);
    }
    if (type === "live") {
      setCitiesLive((resp as any).data);
    }
    // if (type === "stats") {
    //   setCitiesPerPercentage((resp as any).data);
    // }
  };

  const handleSubmitForm = async (values: EditInfluencerFormState) => {
    setIsLoading(true);
    setIsFormSubmitted(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (!EXCLUDED_KEYS.includes(key)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        formData.append(key, values[key]);
      }
    });

    // if (file[0]) {
    //   formData.append("avatar", file[0]);
    // }

    // const newSocials = values.socialMedia.map((social) => {
    //   return {
    //     ...social,
    //     social_media_id: social.social_media_id,
    //     main: mainSocial === social.social_media_id,
    //     age_ranges: social.agePercentage?.map((age: number, index: number) => {
    //       return {
    //         age_range_id: index + 1,
    //         followers_percentage: age || 0,
    //       };
    //     }),

    //     genders: [
    //       { gender_id: 1, followers_percentage: social.gender?.men || 0 },
    //       { gender_id: 2, followers_percentage: social.gender?.women || 0 },
    //     ],
    //   };
    // });

    // formData.append("socialMedia", JSON.stringify(newSocials));

    const categories = [category, subcategory];

    categories.forEach((category, index) => {
      formData.append(`categories[${index}]`, String(category));
    });

    // formData.append(`categories`, JSON.stringify(categories));

    try {
      const resp: any = await modifyInfluencer(
        initialState.id,
        formData as any,
      );

      setIsSuccess(Boolean(resp.success));

      setIsLoading(false);

      if (resp.success) {
        onSubmit();
        return;
      }
    } catch (e) {
      setIsSuccess(false);
      setIsLoading(false);
    }
    setTimeout(() => {
      setIsLoading(false);
      setIsFormSubmitted(false);
    }, 1500);
  };

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  useEffect(() => {
    if (influencerCategories.length === 0) {
      getInfluencerCategories();
    }
  }, [getInfluencerCategories, influencerCategories.length]);

  const filteredCategories = influencerCategories.filter(
    (cat) => cat.parent_id === category,
  );

  if (!formState) return null;
  return (
    <Formik
      initialValues={formState}
      validationSchema={editInfluencerScheme}
      onSubmit={handleSubmitForm}
    >
      {({ errors, handleSubmit, touched, getFieldProps, setFieldValue }) => (
        <CreateInfluencerFormStyled
          onSubmit={handleSubmit}
          className="login-form"
          style={{ width: "80%" }}
        >
          <h3 style={{ width: "100%", textAlign: "left" }}>Datos</h3>
          {/* <div className="dobleContainer">
            <div className="form-section">
              <label htmlFor="name" className="login-form__label">
                Nombre
              </label>
              <Field
                type="text"
                id="name"
                className="form-section__field"
                aria-label="name"
                {...getFieldProps("name")}
              />
              {errors.name && touched.name && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="name"
                />
              )}
            </div>
            <div className="form-section">
              <label htmlFor="surnames" className="login-form__label">
                Apellidos
              </label>
              <Field
                type="text"
                id="surnames"
                className="form-section__field"
                aria-label="surnames"
                {...getFieldProps("surnames")}
              />
              {errors.surnames && touched.surnames && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="surnames"
                />
              )}
            </div>
          </div> */}

          <div className="dobleContainer">
            <div className="form-section">
              <label htmlFor="prefix" className="login-form__label">
                Prefijo
              </label>
              <Field
                type="text"
                id="prefix"
                className="form-section__field"
                aria-label="prefix"
                {...getFieldProps("prefix")}
              />
              {errors.prefix && touched.prefix && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="prefix"
                />
              )}
            </div>
            <div className="form-section">
              <label htmlFor="phone" className="login-form__label">
                Télefono
              </label>
              <Field
                type="text"
                id="phone"
                className="form-section__field"
                aria-label="phone"
                {...getFieldProps("phone")}
              />
              {errors.phone && touched.phone && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="phone"
                />
              )}
            </div>
          </div>

          <div className="dobleContainer">
            <div className="form-section">
              <ReusableSelect
                label="País de nacimiento"
                options={countries.map((country) => ({
                  label: country.name,
                  value: country.id,
                  id: country.id,
                  name: country.name,
                }))}
                setValue={(value) => {
                  if (!value) return;
                  getCitiesFromCountry(+value, "born");
                  setBornCountry(+value);
                  setFieldValue("from_country_id", value);
                }}
                value={bornCountry.toString()}
              />
              {errors.from_country_id && touched.from_country_id && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="from_country_id"
                />
              )}
            </div>
            <div className="form-section">
              <ReusableSelect
                label="Ciudad de nacimiento"
                disabled={!bornCountry}
                options={citiesBorn.map((city) => ({
                  id: city.id,
                  label: city.name,
                  value: city.id,
                  name: city.name,
                }))}
                setValue={(v) => {
                  setBornCity(+v);
                  setFieldValue("from_city_id", v);
                }}
                value={bornCity.toString()}
              />

              {errors.from_city_id && touched.from_city_id && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="from_city_id"
                />
              )}
            </div>
          </div>

          <div className="dobleContainer">
            <div className="form-section">
              <ReusableSelect
                label="País de residencia"
                options={countries.map((country) => ({
                  label: country.name,
                  value: country.id,
                  id: country.id,
                  name: country.name,
                }))}
                setValue={(value) => {
                  if (!value) return;

                  getCitiesFromCountry(+value, "live");
                  setLiveCountry(+value);
                  setFieldValue("living_country_id", value);
                }}
                value={liveCountry.toString()}
              />
              {errors.living_country_id && touched.living_country_id && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="living_country_id"
                />
              )}
            </div>
            <div className="form-section">
              <ReusableSelect
                label="Ciudad de residencia"
                disabled={!liveCountry}
                options={citiesLive.map((city) => ({
                  id: city.id,
                  label: city.name,
                  value: city.id,
                  name: city.name,
                }))}
                setValue={(e) => {
                  setLiveCity(+e);
                  setFieldValue("living_city_id", e);
                }}
                value={liveCity.toString()}
              />

              {errors.living_city_id && touched.living_city_id && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="living_city_id"
                />
              )}
            </div>
          </div>

          <div className="dobleContainer">
            <div className="form-section">
              <ReusableSelect
                label="Categoría de influencer"
                options={parentInfluencerCategories.map((category) => ({
                  id: category.id,
                  name: category.name,
                  value: category.id,
                }))}
                setValue={(v) => setCategory(+v)}
                value={category.toString()}
              />
              {/* {errors.categories && touched.categories && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="categories"
                />
              )} */}
            </div>
            <div className="form-section">
              <ReusableSelect
                label="Subcategoría de influencer"
                options={filteredCategories.map((category) => ({
                  id: category.id,
                  name: category.name,
                  value: category.id,
                }))}
                setValue={(v) => setSubcategory(+v)}
                value={subcategory.toString()}
              />
              {/* {errors.categories && touched.categories && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="categories"
                />
              )} */}
            </div>
          </div>
          {/* <div className="form-section">
            <CustomFileInput
              file={file}
              setFile={(e) => setFile(e)}
              text="Avatar"
            />
          </div> */}

          <button
            type="submit"
            disabled={loading}
            className="login-form__submit"
          >
            {loading ? (
              <Loader width="20px" height="20px" />
            ) : !isSuccess && isFormSubmitted ? (
              <span className="login-form__error-message">
                Datos no validos
              </span>
            ) : isFormSubmitted && isSuccess ? (
              <Loader width="20px" height="20px" />
            ) : isSuccess && isFormSubmitted ? (
              "Usuario editado"
            ) : (
              "Editar usuario"
            )}
          </button>
        </CreateInfluencerFormStyled>
      )}
    </Formik>
  );
};

export default EditInfluencerForm;
