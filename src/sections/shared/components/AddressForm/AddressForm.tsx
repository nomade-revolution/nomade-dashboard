import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import { FullAddress } from "modules/address/domain/Address";
import { addressSchema } from "./validations/validations";
import ReusableSelect from "../ReusableSelect/ReusableSelect";
import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { useCountryContext } from "sections/country/CountryContext/useCountryContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FilterParams,
  OptionsStructure,
} from "sections/shared/interfaces/interfaces";
import { useCitiesContext } from "sections/city/CityContext/useCitiesContext";

interface Props {
  setAddress: Dispatch<SetStateAction<FullAddress | null>>;
  address: FullAddress;
  setIsModalOpen: (value: boolean) => void;
  isEditMode?: boolean;
  editingAddressId?: number | null;
  updateAddress?: (
    id: number,
    address: Partial<FullAddress>,
  ) => Promise<unknown>;
}

const initialState: FullAddress = {
  address: "",
  address_2: "",
  city_id: "1", // Default to first city (ID 1) as string
  // contact_name: "",
  // contact_phone: "",
  country_id: 1, // Default to Spain (ID 1) instead of 0
  name: "",
  province: "",
  zip_code: "",
  id: 0, // Required field
};

const AddressForm = ({
  setAddress,
  address,
  setIsModalOpen,
  isEditMode = false,
  editingAddressId = null,
  updateAddress,
}: Props): React.ReactElement => {
  const { getAllCountries, countries } = useCountryContext();
  const { cities, getAllCities } = useCitiesContext();
  const [countriesFormat, setCountriesFormat] = useState<OptionsStructure[]>(
    [],
  );

  const [citiesFormat, setCitiesFormat] = useState<OptionsStructure[]>([]);
  const [country, setCountry] = useState<string>(
    { ...initialState, ...address }.country_id?.toString() || "1",
  );
  const [city, setCity] = useState<string>(() => {
    const merged = { ...initialState, ...address };
    if (merged.billing_city && merged.city_id === "9999") return "other";
    return merged.city_id?.toString() || "1";
  });
  type AddressFormValues = Omit<FullAddress, "billing_city"> & {
    billing_city: string;
  };

  const handleSubmitForm = async (
    values: AddressFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<AddressFormValues>,
  ) => {
    setSubmitting(true);

    // When "Otra ciudad" (other) is selected, require free-text and use fixed city_id 9999
    if (city === "other") {
      const bc = values.billing_city.trim();
      if (!bc) {
        setFieldError("billing_city", "Indique la ciudad de facturación");
        setSubmitting(false);
        return;
      }
    }

    const cityId =
      city === "other"
        ? 9999
        : typeof city === "string"
          ? parseInt(city, 10)
          : city;
    const billingCity =
      city === "other" ? values.billing_city.trim() || null : null;

    const cleanedValues: Record<string, unknown> = {
      city_id: cityId,
      country_id: +country,
      province: String(values.province || ""),
      zip_code: String(values.zip_code || ""),
      name: String(values.name || ""),
      address: String(values.address || ""),
    };
    if (billingCity !== null) {
      cleanedValues.billing_city = billingCity;
    }

    // Only include address_2 if it has a value, otherwise omit it completely
    if (values.address_2 && values.address_2.trim() !== "") {
      cleanedValues.address_2 = String(values.address_2);
    }

    // Include other fields that might be needed
    if (values.id) cleanedValues.id = values.id;
    if (values.contact_name) cleanedValues.contact_name = values.contact_name;
    if (values.contact_phone)
      cleanedValues.contact_phone = values.contact_phone;

    if (isEditMode && editingAddressId && updateAddress) {
      // Edit mode - call API through the updateAddress prop
      try {
        // Call the updateAddress function passed as prop (this will handle the API call and UI update)
        await updateAddress(editingAddressId, cleanedValues);
        setIsModalOpen(false);
      } catch (error) {
        // Address update failed
      }
    } else {
      // Create mode - existing behavior
      setAddress(cleanedValues as unknown as FullAddress);
      setIsModalOpen(false);
    }

    setSubmitting(false);
  };

  useEffect(() => {
    const countriesArr: OptionsStructure[] = countries.map((country) => ({
      id: country.id,
      name: country.name,
      value: country.id,
    }));

    setCountriesFormat(countriesArr);
  }, [countries]);

  useEffect(() => {
    const citiesArr: OptionsStructure[] = [
      ...cities
        .filter((c) => c.id !== 9999)
        .map((c) => ({
          id: c.id,
          name: c.name,
          value: c.id,
        })),
      { id: 9999, name: "Otra ciudad", value: "other" },
    ];
    setCitiesFormat(citiesArr);
  }, [cities]);

  useEffect(() => {
    const filters: FilterParams = {
      country_id: country,
    };
    getAllCities(filters);
  }, [country, getAllCities]);

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  const initialValues = {
    ...initialState,
    ...address,
    address_2: address.address_2 ? String(address.address_2) : "",
    province: String(address.province || ""),
    zip_code: String(address.zip_code || ""),
    name: String(address.name || ""),
    address: String(address.address || ""),
    billing_city: address.billing_city ?? "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addressSchema}
      onSubmit={handleSubmitForm}
    >
      {({
        errors,
        touched,
        handleSubmit,
        getFieldProps,
        isSubmitting,
        setFieldValue,
      }) => (
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
                setValue={(v) => {
                  setCountry(v);
                  setFieldValue("country_id", v);
                }}
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
                setValue={(v) => {
                  setCity(v);
                  setFieldValue("city_id", v === "other" ? "9999" : v);
                }}
                value={city}
              />
              {city === "other" && (
                <div
                  className="form-subsection"
                  style={{ marginTop: "0.5rem" }}
                >
                  <label
                    htmlFor="billing_city"
                    className="form-subsection__label"
                  >
                    Nombre de la ciudad (facturación)
                  </label>
                  <Field
                    type="text"
                    id="billing_city"
                    className="form-subsection__field"
                    aria-label="Ciudad de facturación"
                    maxLength={255}
                    placeholder="Escriba la ciudad"
                    {...getFieldProps("billing_city")}
                  />
                  {errors.billing_city && touched.billing_city && (
                    <ErrorMessage
                      className="form-subsection__error-message"
                      component="span"
                      name="billing_city"
                    />
                  )}
                </div>
              )}
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
                maxLength={1000}
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
            {/* <div className="form-subsection">
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
            </div> */}
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
