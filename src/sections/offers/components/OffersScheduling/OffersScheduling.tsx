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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import AddressForm from "sections/shared/components/AddressForm/AddressForm";
import { Addresses } from "../OffersForm/OffersForm";
import { FullAddress } from "modules/address/domain/Address";
import { useAddressContext } from "sections/address/AddressContext/useAddressContext";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";

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
  setAddress: (value: string, index: number | null) => void;
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
  addresses: Addresses[];
  setAddresses: Dispatch<SetStateAction<Addresses[]>>;
}

const OffersScheduling = ({
  type,
  getFieldProps,
  touched,
  errors,
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
  addresses,
  setAddresses,
}: Props): React.ReactElement => {
  const { setFieldValue, values } = useFormikContext();
  const {
    createNewAddress,
    updateAddress,
    getAddress,
    address: contextAddress,
  } = useAddressContext();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

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
    const parsedSchedulingState = schedulingStateSelected as
      | OfferableRestaurant[]
      | OfferableActivity[]
      | OfferableLodging[];
    if (parsedSchedulingState[0]?.min_guests !== undefined) {
      setFieldValue("min_guests", parsedSchedulingState[0].min_guests || 0);
    }

    if (parsedSchedulingState[0]?.max_guests !== undefined) {
      setFieldValue("max_guests", parsedSchedulingState[0].max_guests || 0);
    }
  }, [schedulingStateSelected, setFieldValue]);

  useEffect(() => {
    const allWeekDays = [0, 1, 2, 3, 4, 5, 6];
    allWeekDays.forEach((day) => {
      setFieldValue(`from_time_day_${day}_1`, "");
      setFieldValue(`to_time_day_${day}_1`, "");
      setFieldValue(`from_time_day_${day}_2`, "");
      setFieldValue(`to_time_day_${day}_2`, "");
    });
  }, [selectedIndex, setFieldValue]);

  const handleCreateAddress = async (address: FullAddress) => {
    if (!address) return;
    try {
      const newAddress = await createNewAddress(address);
      // @ts-expect-error TODO: fix this
      if (!newAddress || !newAddress.success) return;
      // @ts-expect-error TODO: fix this
      const newId = newAddress.data.id;
      setAddresses([
        ...addresses,
        {
          id: newId,
          name: address.address,
          value: newId,
        },
      ]);
    } catch (error) {
      // console.log("error", error);
    }
  };

  const handleUpdateAddress = async (updatedAddress: FullAddress) => {
    if (!editingAddressId || !updatedAddress) return;
    try {
      const response = await updateAddress(editingAddressId, updatedAddress);
      if (isHttpSuccessResponse(response)) {
        // Update addresses list
        setAddresses(
          addresses.map((addr) =>
            addr.id === editingAddressId
              ? { ...addr, name: updatedAddress.address }
              : addr,
          ),
        );

        // Clean any existing offerable data from stale address strings
        cleanStaleAddressData();

        setIsAddressModalOpen(false);
        setIsEditMode(false);
        setEditingAddressId(null);
      }
    } catch (error) {
      // console.log("error", error);
    }
  };

  const cleanStaleAddressData = () => {
    // Clean restaurant data
    if (schedulingState.restaurant.length > 0) {
      const cleanedRestaurant = schedulingState.restaurant.map((item) => ({
        ...item,
        // Remove any stale address string if it exists
        address: undefined,
      }));
      handleScheduling("restaurant", cleanedRestaurant);
    }

    // Clean lodging data
    if (schedulingState.lodging.length > 0) {
      const cleanedLodging = schedulingState.lodging.map((item) => ({
        ...item,
        // Remove any stale address string if it exists
        address: undefined,
      }));
      handleScheduling("lodging", cleanedLodging);
    }

    // Clean activity data
    if (schedulingState.activity.length > 0) {
      const cleanedActivity = schedulingState.activity.map((item) => ({
        ...item,
        // Remove any stale address string if it exists
        address: undefined,
      }));
      handleScheduling("activity", cleanedActivity);
    }
  };

  const handleEditAddress = async () => {
    // Convert address string to number for comparison
    const addressId = parseInt(address, 10);

    // Check if addressId is valid
    if (isNaN(addressId) || addressId <= 0) {
      return;
    }

    // Find the currently selected address ID
    const selectedAddress = addresses.find(
      (addr) => addr.id === addressId || addr.value === addressId,
    );

    if (selectedAddress) {
      try {
        // Fetch the full address data from the API using context
        await getAddress(selectedAddress.id);
        // The context will update the address state, so we can use it
        setEditingAddressId(selectedAddress.id);
        setIsEditMode(true);
        setIsAddressModalOpen(true);
      } catch (error) {
        // Error fetching address data
      }
    }
  };

  const handleModalClose = () => {
    setIsAddressModalOpen(false);
    setIsEditMode(false);
    setEditingAddressId(null);
  };

  const getAddressDataForEdit = (): FullAddress => {
    if (!isEditMode || !contextAddress || !contextAddress.id)
      return {} as FullAddress;

    return contextAddress;
  };

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

        if (
          selectedIndex !== null &&
          schedulingState.restaurant.length > 0 &&
          schedulingState.restaurant[selectedIndex]
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

      case OfferTypes.lodging: {
        const newOfferableLodging: OfferableLodging = {
          address_id: +address,
          min_guests: +getFieldProps("min_guests").value || 0,
          max_guests: +getFieldProps("max_guests").value || 0,
        };

        if (
          selectedIndex !== null &&
          schedulingState.lodging.length > 0 &&
          schedulingState.lodging[selectedIndex]
        ) {
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

        if (
          selectedIndex !== null &&
          schedulingState.activity.length > 0 &&
          schedulingState.activity[selectedIndex]
        ) {
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
    setAddress("", null);
    setFieldValue("min_guests", 0);
    setFieldValue("max_guests", 0);
  };

  const getIndexAddress = (addressId: number) => {
    const index = addresses.findIndex((address) => address.id === addressId);
    return index !== -1 ? index : null;
  };

  return (
    <OfferSchedulingStyled className="scheduling">
      {(type === OfferTypes.restaurant ||
        type === OfferTypes.activity ||
        type === OfferTypes.lodging) && (
        <div className="scheduling--restaurant">
          <h4>Configura los horarios</h4>
          <div
            className="datasheet-form__address-section"
            style={{ alignItems: "center" }}
          >
            <ReusableSelect
              label="Direcciones"
              options={addresses}
              // @ts-expect-error TODO: fix this
              setValue={(value) => setAddress(value, getIndexAddress(value))}
              value={address}
            />
            <button
              type="button"
              className="datasheet-form__add-address"
              onClick={() => setIsAddressModalOpen(true)}
            >
              <IoAddCircle className="datasheet-form__create--icon" />
              Añadir dirección
            </button>
            <button
              type="button"
              className="datasheet-form__edit-address"
              onClick={handleEditAddress}
              disabled={!address || addresses.length === 0}
            >
              <FaEdit className="datasheet-form__create--icon" />
              Editar dirección
            </button>
          </div>
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
            Guardar horario
          </button>
        ) : null}
      </div>

      <ReusableModal
        children={
          <AddressForm
            // @ts-expect-error TODO: fix this
            address={isEditMode ? getAddressDataForEdit() : {}}
            // @ts-expect-error TODO: fix this
            setAddress={isEditMode ? handleUpdateAddress : handleCreateAddress}
            setIsModalOpen={handleModalClose}
          />
        }
        openModal={isAddressModalOpen}
        setIsModalOpen={handleModalClose}
      />
    </OfferSchedulingStyled>
  );
};

export default OffersScheduling;
