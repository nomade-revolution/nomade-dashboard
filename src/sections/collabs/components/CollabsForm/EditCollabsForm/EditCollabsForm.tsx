import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import Loader from "sections/shared/components/Loader/Loader";
import { useEffect, useState } from "react";
import {
  CollabCollabableCreateDefault,
  FullCollab,
} from "modules/collabs/domain/Collabs";
import { OptionsStructure } from "sections/shared/interfaces/interfaces";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import editCollabValitaionScheme from "./validations";
import CollabableType from "../../CollabableType/CollabableType";
import { FullOffer, OfferTypes } from "modules/offers/domain/Offer";
import { Value } from "react-calendar/src/shared/types.js";
import { Calendar } from "modules/offers/domain/OfferCalendar";
import { formatDateToISO } from "sections/shared/utils/formatDate/formatDate";

export const extractCollabableDate = (date: Value) => {
  if (!date || Array.isArray(date)) return;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getCollabableFromCollab = (collab: FullCollab) => {
  switch (collab.type) {
    case OfferTypes.brand:
      return {};
    case OfferTypes.delivery:
      return {
        date: formatDateToISO(collab.day),
        time: collab.time,
      };
    case OfferTypes.lodging:
      return {
        address_id: collab.addresses_id,
        date:
          collab.from_day && collab.to_day
            ? [formatDateToISO(collab.from_day), formatDateToISO(collab.to_day)]
            : null,
        guests: collab.guests,
      };
    default:
      return {
        address_id: collab.addresses_id,
        date: formatDateToISO(collab.day),
        time: collab.time,
        guests: collab.guests,
      };
  }
};

interface Props {
  collab: FullCollab;
  setIsOpen: (isOpen: boolean) => void;
  offer: FullOffer;
}

const EditCollabForm = ({
  collab,
  offer,
  setIsOpen,
}: Props): React.ReactElement => {
  const [initialData, setInitialData] = useState<FullCollab>({
    ...collab,
    note: collab.note || "",
  });

  useEffect(() => {
    setInitialData({
      ...collab,
      note: collab.note || "",
    });
  }, [collab]);

  const originalCollabableData = getCollabableFromCollab(collab);
  const firstCalendar: Calendar = Array.isArray(offer.calendar)
    ? offer.calendar[0]
    : offer.calendar;

  const [valueDate, onChangeDate] = useState<Value>(
    // @ts-expect-error fix this
    originalCollabableData.date || null,
  );
  const [, setOffersFormat] = useState<OptionsStructure[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(
    originalCollabableData.time || null,
  );
  const [selectedAddress, setSelectedAddress] = useState<number | null>(
    originalCollabableData.address_id || firstCalendar?.address_id,
  );

  const { offers } = useOffersContext();
  const { editCollab, isSuccess, createLoading, error } = useCollabsContext();

  const handleSubmitForm = async (
    values: FullCollab,
    { setSubmitting }: FormikHelpers<FullCollab>,
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

    formData.append("collabable", JSON.stringify(collabable));

    // @ts-expect-error fix this
    const resp = await editCollab(collab.id, formData);

    setSubmitting(false);
    if (resp) {
      setIsOpen(false);
    }
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
      validationSchema={editCollabValitaionScheme}
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
              className="form-subsection__field-large--company"
              {...getFieldProps("offer_id")}
              value={collab.company}
              disabled
            />
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
              value={collab.influencer_name}
              disabled
            />
          </div>

          {offer.type !== OfferTypes.brand ? (
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
              aria-label="Notas internas"
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
              "Collab editada con éxito"
            ) : error ? (
              "Revisa los datos e intentalo de nuevo"
            ) : (
              "Editar collab"
            )}
          </button>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default EditCollabForm;
