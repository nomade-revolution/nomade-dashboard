import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Formik, Field, ErrorMessage, FormikHelpers } from "formik";
import Loader from "sections/shared/components/Loader/Loader";
import { useEffect, useState } from "react";
import {
  // CollabCollabableCreateDefault,
  FullCollab,
} from "modules/collabs/domain/Collabs";
import { OptionsStructure } from "sections/shared/interfaces/interfaces";
// import { Company } from "modules/user/domain/User";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
// import { Influencer } from "@influencer";
// import { FullOffer } from "modules/offers/domain/Offer";
// import { Value } from "react-calendar/src/shared/types.js";
// import {
//   BRAND_OFFER_ID,
//   DELIVERY_OFFER_ID,
//   LODGING_OFFER_ID,
// } from "sections/offers/utils/offersCategories";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
// import { Calendar } from "modules/offers/domain/OfferCalendar";
import editCollabValitaionScheme from "./validations";

interface Props {
  collab: FullCollab;
  setIsOpen: (isOpen: boolean) => void;
}

const EditCollabForm = ({ collab, setIsOpen }: Props): React.ReactElement => {
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

  // const [company, setCompany] = useState<Company>({} as Company);
  // const [offer, setOffer] = useState<FullOffer>({} as FullOffer);
  // const [influencer, setInfluencer] = useState<Influencer>({} as Influencer);
  // const [valueDate, onChangeDate] = useState<Value>(null);
  const [, setOffersFormat] = useState<OptionsStructure[]>([]);
  // const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { offers } = useOffersContext();
  const { editCollab, isSuccess, createLoading, error } = useCollabsContext();

  // const handleFormStateChange = (field: string, value: string) => {
  //   setFormState((prevState) => ({ ...prevState, [field]: value }));
  // };

  const handleSubmitForm = async (
    values: FullCollab,
    { setSubmitting }: FormikHelpers<FullCollab>,
  ) => {
    setSubmitting(true);

    // const formData = new FormData();
    // const collabable = handleCollabable(values as never);

    // const excludedKeys = ["influencer_id", "offer_id", "collabable"];

    // Object.entries(values).forEach(([key, value]) => {
    //   if (!excludedKeys.includes(key)) {
    //     formData.append(key, value as string);
    //   }
    // });

    // formData.append("influencer_id", JSON.stringify(influencer.id));
    // formData.append("offer_id", JSON.stringify(offer.id));
    // formData.append("collabable", JSON.stringify(collabable));

    const resp = await editCollab(collab.id, { note: values.note });

    setSubmitting(false);
    if (resp) {
      setIsOpen(false);
    }
  };

  // const handleCollabable = (values: CollabCollabableCreateDefault) => {
  //   let collabable = {};

  //   switch (offer.offer_category_id) {
  //     case BRAND_OFFER_ID:
  //       collabable = {};
  //       break;
  //     case DELIVERY_OFFER_ID:
  //       collabable = {
  //         day:
  //           valueDate &&
  //           new Date(valueDate.toString()).toISOString().split("T")[0],
  //         time: `${selectedTime}:00`,
  //       };
  //       break;
  //     case LODGING_OFFER_ID:
  //       collabable = {
  //         address_id: offer.addresses[0].address_id,
  //         from_day:
  //           Array.isArray(valueDate) &&
  //           new Date(valueDate[0]!).toISOString().split("T")[0],
  //         to_day:
  //           Array.isArray(valueDate) &&
  //           new Date(valueDate[1]!).toISOString().split("T")[0],
  //         guests: values.guests,
  //       };
  //       break;
  //     default:
  //       collabable = {
  //         address_id: (offer.calendar as Calendar[])[0].address_id,
  //         day:
  //           valueDate &&
  //           new Date(valueDate.toString()).toISOString().split("T")[0],
  //         time: `${selectedTime}:00`,
  //         guests: values.guests,
  //       };
  //   }

  //   return collabable;
  // };

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
          {/* <CollabableType
            errors={errors as never}
            getFieldProps={getFieldProps}
            offer={offer}
            onChangeDate={onChangeDate}
            touched={touched as never}
            valueDate={valueDate}
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
          /> */}

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
