import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import Loader from "sections/shared/components/Loader/Loader";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { useEffect, useState } from "react";
import { collabsRequestSchema, initialData } from "./utils/validations";
import {
  CollabCollabableCreateDefault,
  CollabsRequestStructure,
} from "modules/collabs/domain/Collabs";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import {
  FilterParams,
  OptionsStructure,
} from "sections/shared/interfaces/interfaces";
import { Company } from "modules/user/domain/User";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import { Influencer } from "@influencer";
import { FullOffer, OfferTypes } from "modules/offers/domain/Offer";
import { Value } from "react-calendar/src/shared/types.js";
import CollabableType from "../CollabableType/CollabableType";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { Calendar } from "modules/offers/domain/OfferCalendar";
import { extractCollabableDate } from "./EditCollabsForm/EditCollabsForm";

const CollabsForm = (): React.ReactElement => {
  const [formState, setFormState] = useState<{
    category: string;
    offer_id: string;
  }>({
    category: "",
    offer_id: "",
  });
  const [showCompanySuggestions, setShowCompanySuggestions] =
    useState<boolean>(false);
  const [showInfluencerSuggestions, setShowInfluencerSuggestions] =
    useState<boolean>(false);
  const [companySearch, setCompanySearch] = useState<string>("");
  const [influencerSearch, setInfluencerSearch] = useState<string>("");
  const [company, setCompany] = useState<Company>({} as Company);
  const [offer, setOffer] = useState<FullOffer>({} as FullOffer);
  const [influencer, setInfluencer] = useState<Influencer>({} as Influencer);
  const [valueDate, onChangeDate] = useState<Value>(null);
  const [offersFormat, setOffersFormat] = useState<OptionsStructure[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const firstCalendar: Calendar = Array.isArray(offer.calendar)
    ? offer.calendar[0]
    : offer.calendar;
  const [selectedAddress, setSelectedAddress] = useState<number | null>(
    firstCalendar?.address_id,
  );

  const { companies, getCompaniesWithParams } = useCompanyContext();
  const { getAllOffers, offers } = useOffersContext();
  const { getInfluencersWithParams, influencers } = useInfluencerContext();
  const { addNewCollab, isSuccess, createLoading, error } = useCollabsContext();

  const handleFormStateChange = (field: string, value: string) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleCompanySelect = (companyName: string) => {
    setCompanySearch(companyName);
    setShowCompanySuggestions(false);
  };

  const handleInfluencerSelect = (influencerName: string) => {
    setInfluencerSearch(influencerName);
    setShowInfluencerSuggestions(false);
  };

  const handleOfferSelect = (offer_id: string) => {
    const offer = offers.find((offer) => offer.id === +offer_id);

    setOffer(offer!);
  };

  const handleSubmitForm = async (
    values: CollabsRequestStructure,
    { setSubmitting }: FormikHelpers<CollabsRequestStructure>,
  ) => {
    setSubmitting(true);

    const formData = new FormData();
    const collabable = handleCollabable(values as never);

    const excludedKeys = ["influencer_id", "offer_id", "collabable"];

    Object.entries(values).forEach(([key, value]) => {
      if (!excludedKeys.includes(key)) {
        formData.append(key, value as string);
      }
    });

    formData.append("influencer_id", JSON.stringify(influencer.id));
    formData.append("offer_id", JSON.stringify(offer.id));
    formData.append("collabable", JSON.stringify(collabable));

    await addNewCollab(formData);

    setSubmitting(false);
  };

  const handleCollabable = (values: CollabCollabableCreateDefault) => {
    let collabable = {};

    switch (offer.type) {
      case OfferTypes.brand:
        collabable = {};
        break;
      case OfferTypes.delivery:
        collabable = {
          day: extractCollabableDate(valueDate),
          time: `${selectedTime}:00`,
        };
        break;
      case OfferTypes.lodging:
        collabable = {
          address_id: selectedAddress,
          from_day:
            Array.isArray(valueDate) && extractCollabableDate(valueDate[0]!),
          to_day:
            Array.isArray(valueDate) && extractCollabableDate(valueDate[1]!),
          guests: values.guests,
        };
        break;
      default:
        collabable = {
          address_id: selectedAddress,
          day: extractCollabableDate(valueDate),
          time: `${selectedTime}:00`,
          guests: values.guests,
        };
    }

    return collabable;
  };

  useEffect(() => {
    const filters: FilterParams = { filters: { search: companySearch } };

    if (companySearch) {
      getCompaniesWithParams(filters);
      setShowCompanySuggestions(true);
    } else {
      setShowCompanySuggestions(false);
    }
  }, [companySearch, getCompaniesWithParams]);

  useEffect(() => {
    const filters: FilterParams = { filters: { search: influencerSearch } };

    if (influencerSearch) {
      getInfluencersWithParams(filters);
      setShowInfluencerSuggestions(true);
    } else {
      setShowInfluencerSuggestions(false);
    }
  }, [getInfluencersWithParams, influencerSearch]);

  useEffect(() => {
    const filters: FilterParams = { filters: { company_id: company.id } };

    if (companySearch) {
      getAllOffers(1, 10, filters);
    }
  }, [company.id, companySearch, getAllOffers]);

  useEffect(() => {
    const offersArr: OptionsStructure[] = offers.map((offer) => ({
      id: offer.id!,
      name: ` ${offer.company!} - ${offer.type}`,
      value: offer.id!,
    }));

    setOffersFormat(offersArr);
  }, [offers]);

  return (
    <Formik
      initialValues={initialData}
      validationSchema={collabsRequestSchema}
      onSubmit={handleSubmitForm}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Collab</h3>

          <div className="form-subsection">
            <label htmlFor="offer_id" className="form-subsection__label">
              Cliente
            </label>
            <Field
              type="text"
              id="offer_id"
              placeholder="Introduce el nombre de un cliente"
              className="form-subsection__field-large--company"
              aria-label="Oferta"
              {...getFieldProps("offer_id")}
              value={companySearch}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCompanySearch(event.target.value);
                setShowCompanySuggestions(true);
              }}
            />
            {showCompanySuggestions && companySearch && (
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

            {errors.offer_id && touched.offer_id && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="offer_id"
              />
            )}
            {offersFormat.length > 0 && (
              <ReusableSelect
                label="Ofertas"
                options={offersFormat}
                setValue={(value) => {
                  handleFormStateChange("offer_id", value);
                  handleOfferSelect(value);
                }}
                value={formState.offer_id}
              />
            )}
          </div>
          <div className="form-subsection">
            <label htmlFor="influencer_id" className="form-subsection__label">
              Influencer
            </label>
            <Field
              type="text"
              id="influencer_id"
              placeholder="Introduce a un influencer"
              className="form-subsection__field-large--company"
              aria-label="Influencer"
              {...getFieldProps("influencer_id")}
              value={influencerSearch}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInfluencerSearch(event.target.value);
                setShowInfluencerSuggestions(true);
              }}
            />
            {showInfluencerSuggestions && influencerSearch && (
              <ul className="datasheet-form__suggestions-dropdown">
                {influencers.length > 0 ? (
                  influencers.map((suggestion) => (
                    <li key={suggestion.id}>
                      <button
                        onClick={() => {
                          handleInfluencerSelect(suggestion.name);
                          // TODO entiendo que estaría bien mostrar el surname tambien, por ahora oculto
                          // handleInfluencerSelect(
                          //   `${suggestion.name} ${suggestion.surnames}`,
                          // );
                          setInfluencer(suggestion);
                        }}
                      >
                        {suggestion.name} {suggestion.surnames}
                      </button>
                    </li>
                  ))
                ) : (
                  <span>No se han encontrado resultados</span>
                )}
              </ul>
            )}

            {errors.influencer_id && touched.influencer_id && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="influencer_id"
              />
            )}
          </div>

          {offer.type !== OfferTypes.brand && Object.keys(offer).length ? (
            <CollabableType
              errors={errors as never}
              getFieldProps={getFieldProps}
              offer={offer}
              onChangeDate={onChangeDate}
              touched={touched as never}
              valueDate={valueDate}
              setSelectedTime={setSelectedTime}
              selectedTime={selectedTime}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          ) : null}

          <div className="form-subsection">
            <label htmlFor="comment" className="form-subsection__label">
              Observaciones influencer
            </label>
            <Field
              type="text"
              id="comment"
              className="form-subsection__field-textarea--company"
              aria-label="Observaciones influencer"
              as={"textarea"}
              {...getFieldProps("comment")}
            />
            {errors.comment && touched.comment && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="comment"
              />
            )}
          </div>

          <div className="form-subsection">
            <label htmlFor="note" className="form-subsection__label">
              Notas internas
            </label>
            <Field
              type="text"
              id="note"
              className="form-subsection__field-textarea--company"
              aria-label="Notas internas"
              as={"textarea"}
              {...getFieldProps("note")}
            />
            {errors.note && touched.note && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="note"
              />
            )}
          </div>

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
            {isSubmitting || createLoading ? (
              <Loader width="20px" height="20px" />
            ) : isSuccess ? (
              "Collab creada"
            ) : error ? (
              "Revisa los datos e intentalo de nuevo"
            ) : (
              "Crear collab"
            )}
          </button>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default CollabsForm;
