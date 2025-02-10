import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Field, Formik, FormikHelpers } from "formik";

import {
  AgeRangeSocialRequest,
  CitySocialRequest,
  CountrySocialRequest,
  GenderSocialRequest,
  SocialMedia,
  SocialMediaStatistic,
} from "@influencer/domain/InfluencerSocialMedia";
import {
  initialStateCities,
  initialStateCountries,
} from "./utils/initialStates";
import { useState, useEffect, useCallback } from "react";
import { useCitiesContext } from "sections/city/CityContext/useCitiesContext";
import { useCountryContext } from "sections/country/CountryContext/useCountryContext";
import { FilterParams } from "sections/shared/interfaces/interfaces";
import SocialMediaFormStyled from "./SocialMediaFormStyled";
import CityForm from "./components/CityForm/CityForm";
import CountryForm from "./components/CountryForm/CountryForm";
import AgeRangeForm from "./components/AgeRangeForm/AgeRangeForm";
import GendersForm from "./components/GendersForm/GendersForm";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import Loader from "../Loader/Loader";
import { OptionsStructure } from "../../interfaces/interfaces";

interface Props {
  setIsModalOpen: (value: boolean) => void;
  setIsModalOpenEdit: (value: boolean) => void;
  social: SocialMedia;
  influencer_id: number;
}

const SocialMediaForm = ({
  setIsModalOpen,
  setIsModalOpenEdit,
  social,
  influencer_id,
}: Props): React.ReactElement => {
  const { getAllCountries, countries } = useCountryContext();
  const { getAllCities } = useCitiesContext();
  const { modifyInfluencerStats, isSuccess, error, influencer } =
    useInfluencerContext();

  const [countriesFormat, setCountriesFormat] = useState<OptionsStructure[]>(
    [],
  );
  const [citiesForm, setCitiesForms] = useState<CitySocialRequest[]>(
    social.cities.length > 0
      ? (social.cities as CitySocialRequest[])
      : [{ ...initialStateCities }],
  );
  const [countriesForm, setCountriesForm] = useState<CountrySocialRequest[]>(
    social.countries.length > 0
      ? (social.countries as CountrySocialRequest[])
      : [{ ...initialStateCountries }],
  );
  const [citiesData, setCitiesData] = useState<
    Record<number, OptionsStructure[]>
  >({});

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  useEffect(() => {
    const formattedCountries = countries.map((country) => ({
      id: country.id,
      name: country.name,
      value: country.id,
    }));
    setCountriesFormat(formattedCountries);
  }, [countries]);

  const loadCitiesByCountry = useCallback(
    async (countryId: number) => {
      const filters: FilterParams = { country_id: countryId };
      const response = await getAllCities(filters);

      if (isHttpSuccessResponse(response)) {
        const formattedCities = response.data.map((city) => ({
          id: city.id,
          name: city.name,
          value: city.id,
        }));

        setCitiesData((prev) => ({
          ...prev,
          [countryId]: formattedCities,
        }));
      }
    },
    [getAllCities],
  );

  useEffect(() => {
    if (citiesForm.length > 0) {
      citiesForm.forEach((country) => loadCitiesByCountry(country.country_id));
    }
  }, [citiesForm, loadCitiesByCountry]);

  const handleCityFormChange = (
    index: number,
    updatedCity: CitySocialRequest,
  ) => {
    const updatedForms = [...citiesForm];
    updatedForms[index] = updatedCity;
    setCitiesForms(updatedForms);
  };

  const handleCountryChangeInCityForm = async (
    index: number,
    updatedCountry: CountrySocialRequest,
  ) => {
    const updatedForms = [...citiesForm];

    updatedForms[index] = {
      ...updatedForms[index],
      country_id: updatedCountry.country_id,
      city_id: 0,
    };

    setCitiesForms(updatedForms);
    await loadCitiesByCountry(updatedCountry.country_id);
  };

  const handleAddCityForm = () => {
    setCitiesForms([...citiesForm, { ...initialStateCities }]);
  };

  const handleRemoveCityForm = (index: number) => {
    setCitiesForms(citiesForm.filter((_, idx) => idx !== index));
  };

  const handleAddCountryForm = () => {
    setCountriesForm([...countriesForm, { ...initialStateCountries }]);
  };

  const handleRemoveCountryForm = (index: number) => {
    setCountriesForm(countriesForm.filter((_, idx) => idx !== index));
  };

  const handleSubmitForm = async (
    values: SocialMedia,
    { setSubmitting }: FormikHelpers<SocialMedia>,
  ) => {
    setSubmitting(true);
    const cities = citiesForm.map((city, index) => ({
      city_id: city.city_id
        ? city.city_id
        : (values.cities as CitySocialRequest[])[index]?.id,
      followers_percentage: values.cities[index]?.followers_percentage,
    }));

    const countries = countriesForm.map((country, index) => ({
      country_id: country.country_id
        ? country.country_id
        : (values.countries as CountrySocialRequest[])[index]?.id,
      followers_percentage: (values.countries as CountrySocialRequest[])[index]
        ?.followers_percentage,
    }));

    const genders = values.genders.map((gender) => {
      return {
        gender_id: (gender as SocialMediaStatistic).id,
        followers_percentage: gender.followers_percentage,
      };
    });
    const ageRanges = values.ageRanges.map((age) => ({
      age_range_id: (age as SocialMediaStatistic).id,
      followers_percentage: age.followers_percentage,
    }));

    const socialsNotModified = influencer.socialMedia.filter(
      (socials) => socials.id !== social.id,
    );

    const formatedSocials = socialsNotModified.map((socialsData) => {
      return {
        ...socialsData,
        social_media_id: socialsData.id,
        cities: socialsData.cities.map((city) => ({
          city_id: (city as CitySocialRequest).id,
          followers_percentage: city.followers_percentage,
        })),
        countries: socialsData.countries.map((country) => ({
          country_id: (country as CountrySocialRequest).id,
          followers_percentage: country.followers_percentage,
        })),
        genders: socialsData.genders.map((gender) => ({
          gender_id: (gender as GenderSocialRequest).id!,
          followers_percentage: gender.followers_percentage!,
        })),
        age_ranges: socialsData.ageRanges.map((age) => ({
          age_range_id: (age as AgeRangeSocialRequest).id!,
          followers_percentage: age.followers_percentage!,
        })),
      };
    });

    const parsedSocials = formatedSocials.map((socials) => {
      return {
        ...socials,
        video: null,
      };
    });

    const response = await modifyInfluencerStats(influencer_id, {
      socialMedia: [
        ...parsedSocials,
        {
          ...values,
          social_media_id: social.id,
          cities,
          countries,
          genders,
          age_ranges: ageRanges,
          video: null,
        },
      ],
    });
    setSubmitting(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((response as any).success) {
      setTimeout(() => {
        setIsModalOpenEdit(false);
        setIsModalOpen(false);
      }, 1500);
    }
  };
  const getInitialValues = (social: SocialMedia): SocialMedia => {
    const newSocials = { ...social };
    if (social.genders.length === 0) {
      newSocials.genders = [
        {
          id: 1,
          name: "Hombre",
          followers_percentage: 0,
        },
        {
          id: 2,
          name: "Mujer",
          followers_percentage: 0,
        },
      ];
    }

    if (social.ageRanges.length === 0) {
      newSocials.ageRanges = [
        { id: 1, followers_percentage: 0, name: "13-17" },
        { id: 2, followers_percentage: 0, name: "18-24" },
        { id: 3, followers_percentage: 0, name: "25-34" },
        { id: 4, followers_percentage: 0, name: "35-44" },
        { id: 5, followers_percentage: 0, name: "45-54" },
        { id: 6, followers_percentage: 0, name: "+65" },
      ];
    }
    return newSocials;
  };

  return (
    <SocialMediaFormStyled className="social-form">
      <Formik
        initialValues={getInitialValues(social)}
        onSubmit={handleSubmitForm}
      >
        {({ handleSubmit, getFieldProps, isSubmitting }) => (
          <ReusableFormStyled onSubmit={handleSubmit}>
            <h3>Estadísticas {social?.account_name}</h3>

            <section className="stats__section">
              <h5 className="stats__title">Followers (k)</h5>
              <Field
                type="number"
                className="form-subsection__field"
                aria-label="Followers (k)"
                {...getFieldProps("followers")}
              />
            </section>

            <section className="stats__section">
              <h5 className="stats__title">Visualizaciones</h5>
              <Field
                type="number"
                className="form-subsection__field"
                aria-label="Visualizaciones"
                {...getFieldProps("stories_view")}
              />
            </section>

            <section className="stats__section">
              <h5 className="stats__title">Ciudades</h5>
              {citiesForm.map((formCity, index) => (
                <CityForm
                  key={index}
                  index={index}
                  cityData={formCity}
                  countryData={formCity}
                  countriesFormat={countriesFormat}
                  citiesFormat={citiesData[formCity.country_id] ?? []}
                  onCityChange={(idx, updatedCity) =>
                    handleCityFormChange(idx, updatedCity)
                  }
                  onCountryChange={(idx, updatedCountry) =>
                    handleCountryChangeInCityForm(idx, updatedCountry)
                  }
                  onRemove={() => handleRemoveCityForm(index)}
                  getFieldProps={getFieldProps}
                />
              ))}
              <button
                onClick={handleAddCityForm}
                className="datasheet-form__add-contact"
                type="button"
              >
                Añadir ciudad
              </button>
            </section>

            <section className="stats__section">
              <h5 className="stats__title">Países</h5>
              {countriesForm.map((formCountry, index) => (
                <CountryForm
                  key={index}
                  index={index}
                  data={formCountry}
                  countriesFormat={countriesFormat}
                  onCountryChange={(idx, updatedCountry) => {
                    const updatedForms = [...countriesForm];
                    updatedForms[idx] = updatedCountry;
                    setCountriesForm(updatedForms);
                  }}
                  onRemove={() => handleRemoveCountryForm(index)}
                  getFieldProps={getFieldProps}
                />
              ))}
              <button
                onClick={handleAddCountryForm}
                className="datasheet-form__add-contact"
                type="button"
              >
                Añadir país
              </button>
            </section>

            <section className="stats__section">
              <h5 className="stats__title">Rangos de edad</h5>
              <AgeRangeForm social={social} getFieldProps={getFieldProps} />
            </section>
            <section className="stats__section">
              <h5 className="stats__title">Por género</h5>
              <GendersForm social={social} getFieldProps={getFieldProps} />
            </section>

            <div
              style={{
                display: "flex",
                gap: "20px",
                width: "100%",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
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
                  "Cambios guardados"
                ) : error ? (
                  "Revisa los datos e intentalo de nuevo"
                ) : (
                  "Guardar cambios"
                )}
              </button>

              <button
                onClick={() => {
                  setIsModalOpenEdit(false);
                  setIsModalOpen(false);
                }}
                className={"datasheet-form__error"}
              >
                Cancelar
              </button>
            </div>
          </ReusableFormStyled>
        )}
      </Formik>
    </SocialMediaFormStyled>
  );
};

export default SocialMediaForm;
