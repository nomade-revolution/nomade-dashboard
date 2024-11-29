import {
  ErrorMessage,
  Field,
  FieldConfig,
  FieldInputProps,
  FormikErrors,
  FormikTouched,
  FormikValues,
  useFormikContext,
} from "formik";
import { Company } from "modules/user/domain/User";
import {
  ACTIVITY_OFFER_ID,
  BRAND_OFFER_ID,
  DELIVERY_OFFER_ID,
  LODGING_OFFER_ID,
  RESTAURANT_OFFER_ID,
} from "sections/offers/utils/offersCategories";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import OfferSchedulingStyled from "./OffersSchedulingStyled";
import OffersTimetable from "../OffersTimetable/OffersTimetable";
import {
  FullOffer,
  OfferableActivity,
  OfferableBrand,
  OfferableDelivery,
  OfferableLodging,
  OfferableRestaurant,
  SelectedDay,
  TimeSlot,
  WeekDay,
} from "modules/offers/domain/Offer";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  category: number;
  errors: FormikErrors<
    | OfferableRestaurant
    | OfferableActivity
    | OfferableBrand
    | OfferableDelivery
    | OfferableLodging
  >;
  getFieldProps: <Value = FormikValues>(
    props: string | FieldConfig<Value>,
  ) => FieldInputProps<Value>;
  touched: FormikTouched<
    | OfferableRestaurant
    | OfferableActivity
    | OfferableBrand
    | OfferableDelivery
    | OfferableLodging
  >;
  company: Company;
  address: string;
  setAddress: (value: string) => void;
  handleScheduling: (
    field: string,
    value:
      | OfferableRestaurant[]
      | OfferableActivity[]
      | OfferableDelivery
      | OfferableLodging[],
  ) => void;
  schedulingState: {
    restaurant: OfferableRestaurant[];
    delivery: OfferableDelivery;
    activity: OfferableActivity[];
    brand: object;
    lodging: OfferableLodging[];
  };
  selectedDays: SelectedDay[];
  week: WeekDay[];
  setSelectedDays: Dispatch<SetStateAction<SelectedDay[]>>;
  setWeek: (value: WeekDay[]) => void;
  offer: FullOffer;
  selectedIndex: number | null;
}

const OffersScheduling = ({
  category,
  getFieldProps,
  touched,
  errors,
  company,
  address,
  setAddress,
  handleScheduling,
  schedulingState,
  selectedDays,
  week,
  setSelectedDays,
  setWeek,
  offer,
  selectedIndex,
}: Props): React.ReactElement => {
  const { setFieldValue, values } = useFormikContext();

  const schedulingStateSelected =
    category === RESTAURANT_OFFER_ID
      ? schedulingState.restaurant
      : category === LODGING_OFFER_ID
        ? schedulingState.lodging
        : category === DELIVERY_OFFER_ID
          ? schedulingState.delivery
          : category === ACTIVITY_OFFER_ID
            ? schedulingState.activity
            : schedulingState.brand;

  useEffect(() => {
    if (
      (
        schedulingStateSelected as
          | OfferableRestaurant[]
          | OfferableActivity[]
          | OfferableLodging[]
      )[0]?.min_guests !== undefined
    ) {
      setFieldValue(
        "min_guests",
        (
          schedulingStateSelected as
            | OfferableRestaurant[]
            | OfferableActivity[]
            | OfferableLodging[]
        )[0].min_guests || 0,
      );
    }

    if (
      (
        schedulingStateSelected as
          | OfferableRestaurant[]
          | OfferableActivity[]
          | OfferableLodging[]
      )[0]?.max_guests !== undefined
    ) {
      setFieldValue(
        "max_guests",
        (
          schedulingStateSelected as
            | OfferableRestaurant[]
            | OfferableActivity[]
            | OfferableLodging[]
        )[0].max_guests || 0,
      );
    }
  }, [schedulingStateSelected, setFieldValue]);

  const handleOfferTimetables = () => {
    week.forEach((day) => {
      setFieldValue(`from_time_day_${day.day_of_week}_1`, ""),
        setFieldValue(`to_time_day_${day.day_of_week}_1`, ""),
        setFieldValue(`from_time_day_${day.day_of_week}_2`, ""),
        setFieldValue(`to_time_day_${day.day_of_week}_2`, "");
    });
    const updatedSchedulingState = { ...schedulingState };

    switch (category) {
      case RESTAURANT_OFFER_ID: {
        const key =
          offer?.type.toLocaleLowerCase() as keyof typeof schedulingState;

        const newOfferableRestaurant: OfferableRestaurant = {
          address_id: +address,
          min_guests: +getFieldProps("min_guests").value,
          max_guests: +getFieldProps("max_guests").value || 0,
          week: week || [],
        };

        if (
          (selectedIndex as number) >= 0 &&
          schedulingState.restaurant.length > 0 &&
          selectedIndex !== null
        ) {
          updatedSchedulingState[key] = schedulingState.restaurant.map(
            (item, idx) =>
              idx === selectedIndex ? newOfferableRestaurant : item,
          ) as never;

          handleScheduling(
            "restaurant",
            updatedSchedulingState[key] as OfferableRestaurant[],
          );
        } else {
          updatedSchedulingState[key] = [
            ...schedulingState.restaurant,
            newOfferableRestaurant,
          ] as never;

          handleScheduling(
            "restaurant",
            updatedSchedulingState[key] as OfferableRestaurant[],
          );
        }
        break;
      }

      case LODGING_OFFER_ID: {
        const newOfferableLodging: OfferableLodging = {
          address_id: +address,
          min_guests: +getFieldProps("min_guests").value || 0,
          max_guests: +getFieldProps("max_guests").value || 0,
        };

        handleScheduling("lodging", [
          ...schedulingState.lodging,
          newOfferableLodging,
        ]);
        break;
      }

      case ACTIVITY_OFFER_ID: {
        const newOfferableActivity: OfferableActivity = {
          address_id: +address,
          min_guests: +getFieldProps("min_guests").value || 0,
          max_guests: +getFieldProps("max_guests").value || 0,
          week: week,
        };

        handleScheduling("activity", [
          ...schedulingState.activity,
          newOfferableActivity,
        ]);
        break;
      }

      case DELIVERY_OFFER_ID: {
        const newOfferableDelivery: OfferableDelivery = {
          advance_notice_time: +getFieldProps("advance_notice_time").value || 0,
          week: week,
        };

        handleScheduling("delivery", newOfferableDelivery);
        break;
      }
    }

    week.forEach((day) => {
      setFieldValue(`from_time_day_${day.day_of_week}_1`, ""),
        setFieldValue(`to_time_day_${day.day_of_week}_1`, ""),
        setFieldValue(`from_time_day_${day.day_of_week}_2`, ""),
        setFieldValue(`to_time_day_${day.day_of_week}_2`, "");
    });
    setWeek([]);
    setSelectedDays([]);
    setAddress("");
    setFieldValue("min_guests", 0);
    setFieldValue("max_guests", 0);
  };

  return (
    <OfferSchedulingStyled className="scheduling">
      {(category === RESTAURANT_OFFER_ID ||
        category === ACTIVITY_OFFER_ID ||
        category === LODGING_OFFER_ID) && (
        <div className="scheduling--restaurant">
          <h4>Configura los horarios</h4>
          <section className="scheduling__section">
            <div className="form-subsection">
              <label htmlFor="min_guests" className="form-subsection__label">
                Mínimo de personas
              </label>
              <Field
                type="number"
                id="min_guests"
                className="form-subsection__field--small"
                aria-label="Mínimo de personas"
                {...getFieldProps("min_guests")}
                value={
                  (
                    values as
                      | OfferableRestaurant
                      | OfferableActivity
                      | OfferableLodging
                  ).min_guests ??
                  (
                    schedulingStateSelected as
                      | OfferableRestaurant[]
                      | OfferableActivity[]
                      | OfferableLodging[]
                  )[0]?.min_guests ??
                  0
                }
              />
              {(
                errors as
                  | OfferableRestaurant
                  | OfferableActivity
                  | OfferableLodging
              ).min_guests &&
                (
                  touched as
                    | OfferableRestaurant
                    | OfferableActivity
                    | OfferableLodging
                ).min_guests && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="min_guests"
                  />
                )}
            </div>
            <div className="form-subsection">
              <label htmlFor="max_guests" className="form-subsection__label">
                Máximo de personas
              </label>
              <Field
                type="number"
                id="max_guests"
                className="form-subsection__field--small"
                aria-label="Máximo de personas"
                {...getFieldProps("max_guests")}
                value={
                  (
                    values as
                      | OfferableRestaurant
                      | OfferableActivity
                      | OfferableLodging
                  ).max_guests ??
                  (
                    schedulingStateSelected as
                      | OfferableRestaurant[]
                      | OfferableActivity[]
                      | OfferableLodging[]
                  )[0]?.max_guests ??
                  0
                }
              />
              {(
                errors as
                  | OfferableRestaurant
                  | OfferableActivity
                  | OfferableLodging
              ).max_guests &&
                (
                  touched as
                    | OfferableRestaurant
                    | OfferableActivity
                    | OfferableLodging
                ).max_guests && (
                  <ErrorMessage
                    className="form-subsection__error-message"
                    component="span"
                    name="max_guests"
                  />
                )}
            </div>
          </section>
          <ReusableSelect
            label="Direcciones"
            options={[
              {
                id: company.address?.id,
                name: company.address?.address,
                value: company.address?.id,
              },
            ]}
            setValue={setAddress}
            value={address}
          />
        </div>
      )}
      {category === DELIVERY_OFFER_ID && (
        <div className="form-subsection">
          <label
            htmlFor="advance_notice_time"
            className="form-subsection__label"
          >
            Tiempo previo de aviso
          </label>
          <Field
            type="number"
            id="advance_notice_time"
            className="form-subsection__field--small"
            aria-label="Correo electrónico"
            {...getFieldProps("advance_notice_time")}
          />
          {(errors as OfferableDelivery).advance_notice_time &&
            (touched as OfferableDelivery).advance_notice_time && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="advance_notice_time"
              />
            )}
        </div>
      )}
      <OffersTimetable
        category={category}
        errors={errors as FormikErrors<TimeSlot>}
        getFieldProps={getFieldProps}
        touched={touched as FormikTouched<TimeSlot>}
        setWeek={setWeek}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        setFieldValue={setFieldValue}
        offer={offer}
      />
      <div className="scheduling__btn-container">
        {category && category !== BRAND_OFFER_ID ? (
          <button
            type="button"
            className="scheduling__save-btn"
            onClick={handleOfferTimetables}
          >
            Guardar
          </button>
        ) : null}
      </div>
    </OfferSchedulingStyled>
  );
};

export default OffersScheduling;
