/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateInfluencerPageStyled from "./CreateInfluencerPageStyledd";
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
  socialMedia: [
    {
      account_name: "",
      age_ranges: [],
      cities: [],
      countries: [],
      social_media_id: 0,
      followers: 0,
      genders: [],
      main: true,
      video: "",
    },
  ],
};

const CreateInfluencerPage = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { registerInfluencer } = useInfluencerContext();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(false);
  const { getAllCities } = useCitiesContext();
  const { countries, getAllCountries } = useCountryContext();
  const [citiesBorn, setCitiesBorn] = useState<City[]>([]);
  const [citiesLive, setCitiesLive] = useState<City[]>([]);
  const [bornCity, setBornCity] = useState<number>(0);
  const [liveCity, setLiveCity] = useState<number>(0);
  const [bornCountry, setBornCountry] = useState<number>(0);
  const [liveCountry, setLiveCountry] = useState<number>(0);
  const [socialMediaSelected, setSocialMediaSelected] = useState<number>(0);
  const [file, setFile] = useState<File[]>([]);
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
  };

  const handleSubmitForm = async (values: RegisterInfluencerInterface) => {
    setIsLoading(true);
    setIsFormSubmitted(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formData.append(key, values[key]);
    });

    formData.append("avatar", file[0]);

    const resp: any = await registerInfluencer(formData as any);

    setIsSuccess(Boolean(resp.success));
    setIsLoading(false);

    if (isSuccess) {
      navigate("/users");
      return;
    }

    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 2000);
  };

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  return (
    <CreateInfluencerPageStyled>
      <div className="header">
        <GoBackButton />
        <h2>Crear usuario</h2>
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
                  options={[]}
                  setValue={() => {}}
                  value=""
                />
                {errors.categories && touched.categories && (
                  <ErrorMessage
                    className="login-form__error-message"
                    component="span"
                    name="categories"
                  />
                )}
              </div>
              <div className="form-section" />
            </div>
            <h3 style={{ width: "100%", textAlign: "left" }}>Social Media</h3>

            <div className="dobleContainer">
              <div className="form-section">
                <ReusableSelect
                  label="Red social principal"
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
                    setFieldValue("socialMedia[0].social_media_id", +e);
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
              <div className="form-section"></div>
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
                  {...getFieldProps("socialMedia[0].account_name")}
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
                  {...getFieldProps("socialMedia[0].followers")}
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

            <CustomFileInput
              file={file}
              setFile={(e) => setFile(e)}
              text="Avatar"
            />
            {/* <div className="form-section">
              <h5>% Por género</h5>
              <label htmlFor="men" className="login-form__label">
                Hombres
              </label>
              <Field
                type="text"
                id="men"
                className="form-section__field"
                aria-label="men"
                {...getFieldProps("men")}
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
                {...getFieldProps("women")}
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
              <ReusableSelect
                label="Ciudad"
                options={[]}
                setValue={() => {}}
                value=""
              />
              <Field
                type="text"
                id="cityPercentage"
                className="form-section__field"
                aria-label="cityPercentage"
                {...getFieldProps("cityPercentage")}
              />
              {errors.socialMedia && touched.socialMedia && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="cityPercentage"
                />
              )}
            </div>

            <div className="form-section">
              <h5>% Por países</h5>
              <ReusableSelect
                label="País"
                options={[]}
                setValue={() => {}}
                value=""
              />
              <Field
                type="text"
                id="countryPercentage"
                className="form-section__field"
                aria-label="countryPercentage"
                {...getFieldProps("countryPercentage")}
              />
              {errors.socialMedia && touched.socialMedia && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="countryPercentage"
                />
              )}
            </div>
            <div className="form-section">
              <h5>% Por Franjas de edad</h5>

              <label htmlFor="agePercentage1" className="login-form__label">
                13-17
              </label>
              <Field
                type="text"
                id="agePercentage1"
                className="form-section__field"
                aria-label="agePercentage1"
                {...getFieldProps("agePercentage1")}
              />
              {errors.socialMedia && touched.socialMedia && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="agePercentage1"
                />
              )}
              <label htmlFor="agePercentage2" className="login-form__label">
                18-24
              </label>
              <Field
                type="text"
                id="agePercentage2"
                className="form-section__field"
                aria-label="agePercentage2"
                {...getFieldProps("agePercentage2")}
              />
              {errors.socialMedia && touched.socialMedia && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="agePercentage2"
                />
              )}
              <label htmlFor="agePercentage3" className="login-form__label">
                25-34
              </label>
              <Field
                type="text"
                id="agePercentage3"
                className="form-section__field"
                aria-label="agePercentage3"
                {...getFieldProps("agePercentage3")}
              />
              {errors.socialMedia && touched.socialMedia && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="agePercentage3"
                />
              )}
              <label htmlFor="agePercentage4" className="login-form__label">
                34-44
              </label>
              <Field
                type="text"
                id="agePercentage4"
                className="form-section__field"
                aria-label="agePercentage4"
                {...getFieldProps("agePercentage4")}
              />
              {errors.socialMedia && touched.socialMedia && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="agePercentage4"
                />
              )}
              <label htmlFor="agePercentage5" className="login-form__label">
                44-54
              </label>
              <Field
                type="text"
                id="agePercentage5"
                className="form-section__field"
                aria-label="agePercentage5"
                {...getFieldProps("agePercentage5")}
              />
              {errors.socialMedia && touched.socialMedia && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="agePercentage5"
                />
              )}
              <label htmlFor="agePercentage6" className="login-form__label">
                65+
              </label>
              <Field
                type="text"
                id="agePercentage6"
                className="form-section__field"
                aria-label="agePercentage6"
                {...getFieldProps("agePercentage6")}
              />
              {errors.socialMedia && touched.socialMedia && (
                <ErrorMessage
                  className="login-form__error-message"
                  component="span"
                  name="agePercentage6"
                />
              )}
            </div> */}
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
    </CreateInfluencerPageStyled>
  );
};

export default CreateInfluencerPage;
