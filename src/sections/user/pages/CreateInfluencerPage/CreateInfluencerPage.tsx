/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { RegisterInfluencerInterface } from "@auth";
import { ErrorMessage, Field, Formik } from "formik";
import { registerInfluencerScheme } from "sections/auth/components/validations/validations";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import { useNavigate } from "react-router-dom";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import CreateInfluencerFormStyled from "./CreateInfluencerFormStyled";
import { useCitiesContext } from "sections/city/CityContext/useCitiesContext";
import { useCountryContext } from "sections/country/CountryContext/useCountryContext";
import { City } from "modules/user/domain/User";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import CustomFileInput from "sections/shared/components/CustomFileInput/CustomFileInput";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import { FaDeleteLeft, FaPlus } from "react-icons/fa6";
import theme from "assets/styles/theme";
import { Checkbox } from "@mui/material";

const initialState: RegisterInfluencerInterface = {
  name: "",
  email: "",
  surnames: "",
  prefix: "",
  LGPD: true,
  password: "",
  password_confirmation: "",
  avatar: null,
  categories: [3],
  phone: "",
  from_city_id: 0,
  from_country_id: 0,
  living_city_id: 0,
  living_country_id: 0,
  socialMedia: [],
};

const CreateInfluencerPage = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { registerInfluencer, modifyInfluencerStats } = useInfluencerContext();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(false);
  const { getAllCities } = useCitiesContext();
  const { countries, getAllCountries } = useCountryContext();
  const [countriesStats, setCountriesStates] = useState<string[]>([
    "0",
    "0",
    "0",
    "0",
  ]);
  const [citiesStats, setCitiesStates] = useState<string[]>([
    "0",
    "0",
    "0",
    "0",
  ]);
  const [mainSocial, setMainSocial] = useState<number>(0);
  const [citiesBorn, setCitiesBorn] = useState<City[]>([]);
  const [citiesLive, setCitiesLive] = useState<City[]>([]);
  const [countryForCityStats, setCountryForCityStats] = useState<number>(0);
  const [bornCity, setBornCity] = useState<number>(0);
  const [liveCity, setLiveCity] = useState<number>(0);
  const [bornCountry, setBornCountry] = useState<number>(0);
  const [liveCountry, setLiveCountry] = useState<number>(0);
  const [socialMediaSelected, setSocialMediaSelected] = useState<number>(0);
  const [file, setFile] = useState<File[]>([]);
  const [citiesPerPercentage, setCitiesPerPercentage] = useState<City[]>([]);
  const [category, setCategory] = useState<number>(0);
  const { influencerCategories, getInfluencerCategories } =
    useInfluencerContext();
  const [socials, setSocials] = useState<number[]>([]);

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
    if (type === "stats") {
      setCitiesPerPercentage((resp as any).data);
    }
  };
  const handleSubmitForm = async (values: RegisterInfluencerInterface) => {
    setIsLoading(true);
    setIsFormSubmitted(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (
        key !== "categories" &&
        key !== "avatar" &&
        key !== "socialMedia" &&
        key !== "gender" &&
        key !== "ageRanges"
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        formData.append(key, values[key]);
      }
    });

    if (file[0]) {
      formData.append("avatar", file[0]);
    }
    const newSocials = values.socialMedia.map((social) => {
      return {
        ...social,
        social_media_id: social.social_media_id,
        main: mainSocial === social.social_media_id,
        age_ranges: social.agePercentage.map((age: number, index: number) => {
          return {
            age_range_id: index + 1,
            followers_percentage: age,
          };
        }),

        genders: [
          { gender_id: 1, followers_percentage: social.gender.men },
          { gender_id: 2, followers_percentage: social.gender.women },
        ],
      };
    });

    formData.append("categories[]", JSON.stringify(category));

    try {
      const resp: any = await registerInfluencer(formData as any);
      const a = await modifyInfluencerStats(resp.data.id, {
        socialMedia: newSocials,
      });

      setIsSuccess(Boolean((a as any).success));

      setIsLoading(false);

      if (isSuccess) {
        navigate("/users");
        return;
      }
    } catch (e) {
      setIsSuccess(false);
      setIsLoading(false);
    }
    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 2000);
  };

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  useEffect(() => {
    if (influencerCategories.length === 0) {
      getInfluencerCategories();
    }
  }, [getInfluencerCategories, influencerCategories.length]);
  return (
    <ReusablePageStyled>
      <div className="header">
        <div style={{ minWidth: "35%" }}>
          <GoBackButton />
        </div>
        <h2 style={{ textAlign: "center" }}>Crear usuario</h2>
        <div />
      </div>
      <Formik
        initialValues={initialState}
        validationSchema={registerInfluencerScheme}
        onSubmit={handleSubmitForm}
      >
        {({ errors, handleSubmit, touched, getFieldProps, setFieldValue }) => (
          <CreateInfluencerFormStyled
            onSubmit={handleSubmit}
            className="login-form"
            style={{ width: "80%" }}
          >
            <h3 style={{ width: "100%", textAlign: "left" }}>Datos</h3>
            <div className="dobleContainer">
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
            </div>

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
                  options={influencerCategories.map((category) => ({
                    id: category.id,
                    name: category.name,
                    value: category.id,
                  }))}
                  setValue={(v) => setCategory(+v)}
                  value={category.toString()}
                />
                {errors.categories && touched.categories && (
                  <ErrorMessage
                    className="login-form__error-message"
                    component="span"
                    name="categories"
                  />
                )}
              </div>
            </div>
            <div className="form-section">
              <CustomFileInput
                file={file}
                setFile={(e) => setFile(e)}
                text="Avatar"
              />
            </div>

            <h3 style={{ width: "100%", textAlign: "left" }}>Cuenta</h3>
            <div className="form-section">
              <label htmlFor="email" className="login-form__label">
                Email
              </label>
              <Field
                type="email"
                id="email"
                className="form-section__field"
                aria-label="email"
                {...getFieldProps("email")}
              />
              {errors.email && touched.email && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="email"
                />
              )}
            </div>

            <div className="dobleContainer">
              <div className="form-section">
                <label htmlFor="password" className="login-form__label">
                  Contraseña
                </label>
                <Field
                  type="password"
                  id="password"
                  className="form-section__field"
                  aria-label="password"
                  {...getFieldProps("password")}
                />
                {errors.password && touched.password && (
                  <ErrorMessage
                    className="login-form__error-message"
                    component="span"
                    name="password"
                  />
                )}
              </div>
              <div className="form-section">
                <label
                  htmlFor="password_confirmation"
                  className="login-form__label"
                >
                  Repetir contraseña
                </label>

                <Field
                  type="password"
                  id="password_confirmation"
                  className="form-section__field"
                  aria-label="password_confirmation"
                  {...getFieldProps("password_confirmation")}
                />
                {errors.password_confirmation &&
                  touched.password_confirmation && (
                    <ErrorMessage
                      className="login-form__error-message"
                      component="span"
                      name="password_confirmation"
                    />
                  )}
              </div>
            </div>

            <h3 style={{ width: "100%", textAlign: "left" }}>Social Media</h3>

            {socials.map((social, index) => (
              <div key={social} className="socialContainer">
                <div className="dobleContainer">
                  <div className="form-section">
                    <ReusableSelect
                      label="Red social"
                      options={[
                        {
                          id: 1,
                          name: "Instagram",
                          value: "1",
                        },
                        {
                          value: "2",
                          id: 2,
                          name: "TikTok",
                        },
                        {
                          value: "3",
                          id: 3,
                          name: "Twitch",
                        },
                        {
                          value: "4",
                          id: 4,
                          name: "Youtube",
                        },
                      ]}
                      setValue={(e) => {
                        setSocialMediaSelected(+e);
                        setFieldValue(
                          `socialMedia[${index}].social_media_id`,
                          +e,
                        );
                      }}
                      value={socialMediaSelected.toString()}
                    />
                    {errors.socialMedia && touched.socialMedia && (
                      <ErrorMessage
                        className="login-form__error-message"
                        component="span"
                        name="socialMedia"
                      />
                    )}
                  </div>
                  <div className="form-section">
                    {(mainSocial === social || !mainSocial) && (
                      <label>
                        Red Social Principal
                        <Checkbox
                          checked={mainSocial === social}
                          onChange={(v) => {
                            if (v.target.checked) {
                              setMainSocial(social);
                              setFieldValue(`socialMedia[${index}].main`, true);
                              return;
                            }
                            setMainSocial(0);
                            setFieldValue(`socialMedia[${index}].main`, false);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="dobleContainer">
                  <div className="form-section">
                    <label htmlFor="acountName" className="login-form__label">
                      Nombre de la cuenta
                    </label>
                    <Field
                      type="text"
                      id="acountName"
                      className="form-section__field"
                      aria-label="acountName"
                      {...getFieldProps(`socialMedia[${index}].account_name`)}
                    />
                    {errors.socialMedia && touched.socialMedia && (
                      <ErrorMessage
                        className="login-form__error-message"
                        component="span"
                        name="acountName"
                      />
                    )}
                  </div>
                  <div className="form-section">
                    <label htmlFor="email" className="login-form__label">
                      Followers
                    </label>
                    <Field
                      type="text"
                      id="followers"
                      className="form-section__field"
                      aria-label="followers"
                      {...getFieldProps(`socialMedia[${index}].followers`)}
                    />
                    {errors.socialMedia && touched.socialMedia && (
                      <ErrorMessage
                        className="login-form__error-message"
                        component="span"
                        name="followers"
                      />
                    )}
                  </div>
                </div>

                <div className="form-section">
                  <h5>% Por género</h5>

                  <label htmlFor="men" className="login-form__label">
                    Hombres
                  </label>
                  <Field
                    type="text"
                    id="men"
                    className="form-section__field"
                    aria-label="men"
                    {...getFieldProps(`socialMedia[${index}].gender.men`)}
                  />
                  {errors.socialMedia && touched.socialMedia && (
                    <ErrorMessage
                      className="login-form__error-message"
                      component="span"
                      name="men"
                    />
                  )}

                  <label htmlFor="women" className="login-form__label">
                    Mujeres
                  </label>
                  <Field
                    type="text"
                    id="women"
                    className="form-section__field"
                    aria-label="women"
                    {...getFieldProps(`socialMedia[${index}].gender.women`)}
                  />
                  {errors.socialMedia && touched.socialMedia && (
                    <ErrorMessage
                      className="login-form__error-message"
                      component="span"
                      name="women"
                    />
                  )}
                </div>
                <div className="form-section">
                  <h5>% Por ciudades</h5>
                  {citiesStats.map((_city, cityIndex) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          width: "100%",
                          marginBottom: "20px",
                        }}
                      >
                        {cityIndex === 0 && (
                          <div
                            className="formInputsContainer"
                            style={{ marginBottom: "30px" }}
                          >
                            <ReusableSelect
                              label="País"
                              options={countries.map((country) => ({
                                label: country.name,
                                value: country.id,
                                id: country.id,
                                name: country.name,
                              }))}
                              setValue={(v) => {
                                if (!v) {
                                  return;
                                }
                                setCountryForCityStats(+v);

                                setFieldValue(
                                  `socialMedia[${index}].cities[${0}].country_id`,
                                  v,
                                );

                                setFieldValue(
                                  `socialMedia[${index}].cities[${1}].country_id`,
                                  v,
                                );
                                setFieldValue(
                                  `socialMedia[${index}].cities[${2}].country_id`,
                                  v,
                                );
                                setFieldValue(
                                  `socialMedia[${index}].cities[${3}].country_id`,
                                  v,
                                );
                                getCitiesFromCountry(+v, "stats");
                              }}
                              value={countryForCityStats?.toString()}
                            />
                          </div>
                        )}
                        <div className="formInputsContainer">
                          <ReusableSelect
                            label="Ciudad"
                            options={citiesPerPercentage.map((city) => ({
                              id: city.id,
                              label: city.name,
                              value: city.id,
                              name: city.name,
                            }))}
                            disabled={!countryForCityStats}
                            setValue={(v) => {
                              setFieldValue(
                                `socialMedia[${index}].cities[${cityIndex}].city_id`,
                                v,
                              );
                              setCitiesStates(
                                citiesStats.map((cityId, indexMap) =>
                                  indexMap === cityIndex ? v : cityId,
                                ),
                              );
                            }}
                            value={citiesStats[cityIndex].toString()}
                          />
                        </div>
                        <Field
                          type="text"
                          id="followers_percentage"
                          className="form-section__field"
                          aria-label="followers_percentage"
                          {...getFieldProps(
                            `socialMedia[${index}].cities[${cityIndex}].followers_percentage`,
                          )}
                        />
                        {errors.socialMedia && touched.socialMedia && (
                          <ErrorMessage
                            className="login-form__error-message"
                            component="span"
                            name=""
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="form-section">
                  <h5>% Por países</h5>
                  {countriesStats.map((_countryStat, countryIndex) => {
                    return (
                      <div
                        className="formInputsContainer"
                        style={{
                          flexDirection: "column",
                          marginBottom: "20px",
                        }}
                      >
                        <ReusableSelect
                          label="País"
                          options={countries.map((country) => ({
                            label: country.name,
                            value: country.id,
                            id: country.id,
                            name: country.name,
                          }))}
                          setValue={(v) => {
                            setFieldValue(
                              `socialMedia[${index}].countries[${countryIndex}].country_id`,
                              v,
                            );
                            setCountriesStates(
                              countriesStats.map((countryId, indexMap) =>
                                indexMap === countryIndex ? v : countryId,
                              ),
                            );
                          }}
                          value={countriesStats[countryIndex].toString()}
                        />
                        <Field
                          type="text"
                          id="followers_percentage"
                          className="form-section__field"
                          aria-label="followers_percentage"
                          {...getFieldProps(
                            `socialMedia[${index}].countries[${countryIndex}].followers_percentage`,
                          )}
                        />
                        {errors.socialMedia && touched.socialMedia && (
                          <ErrorMessage
                            className="login-form__error-message"
                            component="span"
                            name=""
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="form-section">
                  <h5>% Por Franjas de edad</h5>

                  <div className="formInputsContainer">
                    <div>
                      <label
                        htmlFor="agePercentage1"
                        className="login-form__label"
                      >
                        13-17
                      </label>
                      <Field
                        type="text"
                        id="agePercentage1"
                        className="form-section__field"
                        aria-label="agePercentage1"
                        {...getFieldProps(
                          `socialMedia[${index}].agePercentage[0]`,
                        )}
                      />
                      {errors.socialMedia && touched.socialMedia && (
                        <ErrorMessage
                          className="login-form__error-message"
                          component="span"
                          name="agePercentage1"
                        />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="agePercentage2"
                        className="login-form__label"
                      >
                        18-24
                      </label>
                      <Field
                        type="text"
                        id="agePercentage2"
                        className="form-section__field"
                        aria-label="agePercentage2"
                        {...getFieldProps(
                          `socialMedia[${index}].agePercentage[1]`,
                        )}
                      />
                      {errors.socialMedia && touched.socialMedia && (
                        <ErrorMessage
                          className="login-form__error-message"
                          component="span"
                          name="agePercentage2"
                        />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="agePercentage3"
                        className="login-form__label"
                      >
                        25-34
                      </label>
                      <Field
                        type="text"
                        id="agePercentage3"
                        className="form-section__field"
                        aria-label="agePercentage3"
                        {...getFieldProps(
                          `socialMedia[${index}].agePercentage[2]`,
                        )}
                      />
                      {errors.socialMedia && touched.socialMedia && (
                        <ErrorMessage
                          className="login-form__error-message"
                          component="span"
                          name="agePercentage3"
                        />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="agePercentage4"
                        className="login-form__label"
                      >
                        35-44
                      </label>
                      <Field
                        type="text"
                        id="agePercentage4"
                        className="form-section__field"
                        aria-label="agePercentage4"
                        {...getFieldProps(
                          `socialMedia[${index}].agePercentage[3]`,
                        )}
                      />
                      {errors.socialMedia && touched.socialMedia && (
                        <ErrorMessage
                          className="login-form__error-message"
                          component="span"
                          name="agePercentage4"
                        />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="agePercentage5"
                        className="login-form__label"
                      >
                        45-54
                      </label>
                      <Field
                        type="text"
                        id="agePercentage5"
                        className="form-section__field"
                        aria-label="agePercentage5"
                        {...getFieldProps(
                          `socialMedia[${index}].agePercentage[4]`,
                        )}
                      />
                      {errors.socialMedia && touched.socialMedia && (
                        <ErrorMessage
                          className="login-form__error-message"
                          component="span"
                          name="agePercentage5"
                        />
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="agePercentage6"
                        className="login-form__label"
                      >
                        65+
                      </label>
                      <Field
                        type="text"
                        id="agePercentage6"
                        className="form-section__field"
                        aria-label="agePercentage6"
                        {...getFieldProps(
                          `socialMedia[${index}].agePercentage[5]`,
                        )}
                      />
                      {errors.socialMedia && touched.socialMedia && (
                        <ErrorMessage
                          className="login-form__error-message"
                          component="span"
                          name="agePercentage6"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <ActionButton
                color={theme.colors.darkBlue}
                icon={<FaPlus />}
                onClick={() => {
                  if (socials.length === 0) {
                    setSocials([1]);
                    return;
                  }
                  setSocials([...socials, socials[socials.length - 1] + 1]);
                }}
                text="Añadir red social"
              />
              <ActionButton
                color={theme.colors.darkRed}
                icon={<FaDeleteLeft />}
                onClick={() => {
                  if (socials.length === 0) {
                    return;
                  }
                  const newSocials = socials.slice(0, -1);
                  setSocials(newSocials!);
                }}
                text="Eliminar red social"
              />
            </div>
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
                "Usuario creado"
              ) : (
                "Crear usuario"
              )}
            </button>
          </CreateInfluencerFormStyled>
        )}
      </Formik>
    </ReusablePageStyled>
  );
};

export default CreateInfluencerPage;
