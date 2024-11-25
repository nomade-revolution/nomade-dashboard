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
import { FullOffer } from "modules/offers/domain/Offer";
import { Value } from "react-calendar/src/shared/types.js";
import CollabableType from "../CollabableType/CollabableType";
import {
  BRAND_OFFER_ID,
  DELIVERY_OFFER_ID,
  LODGING_OFFER_ID,
} from "sections/offers/utils/offersCategories";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { Calendar } from "modules/offers/domain/OfferCalendar";

const CompanyForm = (): React.ReactElement => {
  const [formState, setFormState] = useState<{
    category: string;
    offer_id: string;
    address: string;
  }>({
    category: "",
    offer_id: "",
    address: "",
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

    switch (offer.offer_category_id) {
      case BRAND_OFFER_ID:
        collabable = {};
        break;
      case DELIVERY_OFFER_ID:
        collabable = {
          day:
            valueDate &&
            new Date(valueDate.toString()).toISOString().split("T")[0],
          time: `${selectedTime}:00`,
        };
        break;
      case LODGING_OFFER_ID:
        collabable = {
          address_id: offer.addresses[0].address_id,
          from_day:
            Array.isArray(valueDate) &&
            new Date(valueDate[0]!).toISOString().split("T")[0],
          to_day:
            Array.isArray(valueDate) &&
            new Date(valueDate[1]!).toISOString().split("T")[0],
          guests: values.guests,
        };
        break;
      default:
        collabable = {
          address_id: (offer.calendar as Calendar[])[0].address_id,
          day:
            valueDate &&
            new Date(valueDate.toString()).toISOString().split("T")[0],
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
      getAllOffers(1, 12, filters);
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
                          setInfluencer(suggestion);
                        }}
                      >
                        {suggestion.name}
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

          <div className="form-subsection">
            <label htmlFor="comment" className="form-subsection__label">
              Comentario
            </label>
            <Field
              type="text"
              id="comment"
              className="form-subsection__field-textarea--company"
              aria-label="Comentario"
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
          <CollabableType
            errors={errors as never}
            getFieldProps={getFieldProps}
            offer={offer}
            onChangeDate={onChangeDate}
            touched={touched as never}
            valueDate={valueDate}
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
          />

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

export default CompanyForm;
