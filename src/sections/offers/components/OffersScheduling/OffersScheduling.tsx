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
  OfferTypes,
  SelectedDay,
  TimeSlot,
  WeekDay,
} from "modules/offers/domain/Offer";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  type: OfferTypes | string;
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
  week: WeekDay[][];
  setSelectedDays: Dispatch<SetStateAction<SelectedDay[]>>;
  setWeek: (value: WeekDay[]) => void;
  offer: FullOffer;
  selectedIndex: number | null;
}

const OffersScheduling = ({
  type,
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
    type === OfferTypes.restaurant
      ? schedulingState.restaurant
      : type === OfferTypes.lodging
        ? schedulingState.lodging
        : type === OfferTypes.delivery
          ? schedulingState.delivery
          : type === OfferTypes.activity
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
    const updatedSchedulingState = { ...schedulingState };

    switch (type) {
      case OfferTypes.restaurant: {
        const key =
          offer?.type.toLocaleLowerCase() as keyof typeof schedulingState;

        const newOfferableRestaurant: OfferableRestaurant = {
          address_id: +address,
          min_guests: +getFieldProps("min_guests").value,
          max_guests: +getFieldProps("max_guests").value || 0,
          week: week || [],
        };

        if (selectedIndex !== null && schedulingState.restaurant.length > 0) {
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

      case OfferTypes.lodging: {
        const newOfferableLodging: OfferableLodging = {
          address_id: +address,
          min_guests: +getFieldProps("min_guests").value || 0,
          max_guests: +getFieldProps("max_guests").value || 0,
        };

        if (selectedIndex !== null && schedulingState.lodging.length > 0) {
          updatedSchedulingState.lodging = schedulingState.lodging.map(
            (item, idx) => (idx === selectedIndex ? newOfferableLodging : item),
          );

          handleScheduling("lodging", updatedSchedulingState.lodging);
        } else {
          updatedSchedulingState.lodging = [
            ...schedulingState.lodging,
            newOfferableLodging,
          ];

          handleScheduling("lodging", updatedSchedulingState.lodging);
        }
        break;
      }

      case OfferTypes.activity: {
        const newOfferableActivity: OfferableActivity = {
          address_id: +address,
          min_guests: +getFieldProps("min_guests").value || 0,
          max_guests: +getFieldProps("max_guests").value || 0,
          week: week,
        };

        if (selectedIndex !== null && schedulingState.activity.length > 0) {
          updatedSchedulingState.activity = schedulingState.activity.map(
            (item, idx) =>
              idx === selectedIndex ? newOfferableActivity : item,
          );

          handleScheduling("activity", updatedSchedulingState.activity);
        } else {
          updatedSchedulingState.activity = [
            ...schedulingState.activity,
            newOfferableActivity,
          ];

          handleScheduling("activity", updatedSchedulingState.activity);
        }
        break;
      }

      case OfferTypes.delivery: {
        const newOfferableDelivery: OfferableDelivery = {
          advance_notice_time: +getFieldProps("advance_notice_time").value || 0,
          week: week,
        };

        updatedSchedulingState.delivery = newOfferableDelivery;

        handleScheduling("delivery", updatedSchedulingState.delivery);
        break;
      }

      default:
        break;
    }

    week.forEach((day) => {
      // @ts-expect-error TODO: fix this
      setFieldValue(`from_time_day_${day.day_of_week}_1`, "");
      // @ts-expect-error TODO: fix this
      setFieldValue(`to_time_day_${day.day_of_week}_1`, "");
      // @ts-expect-error TODO: fix this
      setFieldValue(`from_time_day_${day.day_of_week}_2`, "");
      // @ts-expect-error TODO: fix this
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
      {(type === OfferTypes.restaurant ||
        type === OfferTypes.activity ||
        type === OfferTypes.lodging) && (
        <div className="scheduling--restaurant">
          <h4>Configura los horarios</h4>
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
        </div>
      )}
      {type === OfferTypes.delivery && (
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
        type={type}
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
        {type && type !== OfferTypes.brand ? (
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
