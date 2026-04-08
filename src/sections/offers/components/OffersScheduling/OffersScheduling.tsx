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
import { FaTrashAlt } from "react-icons/fa";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import AddressForm from "sections/shared/components/AddressForm/AddressForm";
import { Addresses } from "../OffersForm/OffersForm";
import { FullAddress } from "modules/address/domain/Address";
import { useAddressContext } from "sections/address/AddressContext/useAddressContext";
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import { offersTimetable } from "sections/offers/utils/offersTimetable";

type WeekScheduleSlot = { from_time: string; to_time: string };
type WeekScheduleDay = Omit<WeekDay, "time_slot"> & {
  time_slot: WeekScheduleSlot[];
};

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
  addresses,
  setAddresses,
}: Props): React.ReactElement => {
  const { setFieldValue, values } = useFormikContext();
  const {
    createNewAddress,
    updateAddress,
    getAddress,
    deleteAddress,
    address: contextAddress,
  } = useAddressContext();
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [scheduleError, setScheduleError] = useState<string>("");
  const [scheduleSaved, setScheduleSaved] = useState<boolean>(false);
  const [showScheduleToast, setShowScheduleToast] = useState<boolean>(false);

  useEffect(() => {
    const selectedAddressId = Number.parseInt(address, 10);
    const hasValidAddress =
      Number.isInteger(selectedAddressId) && selectedAddressId > 0;

    if (!hasValidAddress) {
      setWeek([]);
      setSelectedDays([]);
      return;
    }

    const byTypeOfferables =
      type === OfferTypes.restaurant
        ? schedulingState.restaurant
        : type === OfferTypes.activity
          ? schedulingState.activity
          : type === OfferTypes.lodging
            ? schedulingState.lodging
            : [];

    const existingOfferable = Array.isArray(byTypeOfferables)
      ? byTypeOfferables.find((item) => item.address_id === selectedAddressId)
      : undefined;

    if (!existingOfferable) {
      setWeek([]);
      setSelectedDays([]);
      setFieldValue("min_guests", 0);
      setFieldValue("max_guests", 0);
      setFieldValue("advance_notice_time", 0);
      return;
    }

    setFieldValue("min_guests", existingOfferable.min_guests || 0);
    setFieldValue("max_guests", existingOfferable.max_guests || 0);
    setFieldValue(
      "advance_notice_time",
      "advance_notice_time" in existingOfferable
        ? existingOfferable.advance_notice_time || 0
        : 0,
    );

    const existingWeek = (
      existingOfferable as OfferableRestaurant | OfferableActivity
    ).week;
    const normalizedWeek = Array.isArray(existingWeek)
      ? (existingWeek as unknown as WeekScheduleDay[])
      : [];

    setWeek(normalizedWeek as unknown as WeekDay[]);

    const mappedSelectedDays: SelectedDay[] = normalizedWeek.map((day) => {
      const timetableDay = offersTimetable.find(
        (item) => item.day_number === day.day_of_week,
      );
      const daySlots = Array.isArray(day.time_slot) ? day.time_slot : [];
      return {
        day_number: day.day_of_week,
        day_name: day.day_name || timetableDay?.name || "",
        shifts: {
          firstShift: {
            from_time: daySlots[0]?.from_time || "",
            to_time: daySlots[0]?.to_time || "",
          },
          secondShift: {
            from_time: daySlots[1]?.from_time || "",
            to_time: daySlots[1]?.to_time || "",
          },
        },
      };
    });

    setSelectedDays(mappedSelectedDays);
  }, [address, schedulingState, type, setFieldValue, setSelectedDays, setWeek]);

  useEffect(() => {
    setScheduleSaved(false);
  }, [address, week]);

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

  const handleUpdateAddress = async (
    addressId: number,
    updatedAddress: Partial<FullAddress>,
  ) => {
    if (!addressId || !updatedAddress) return;
    try {
      const response = await updateAddress(addressId, updatedAddress);
      if (isHttpSuccessResponse(response)) {
        // Update addresses list with the response data from the API
        const updatedAddresses = addresses.map((addr) =>
          addr.id === addressId
            ? { ...addr, name: response.data.address }
            : addr,
        );

        setAddresses(updatedAddresses);

        // Clean any existing offerable data from stale address strings
        cleanStaleAddressData();

        setIsAddressModalOpen(false);
        setIsEditMode(false);
        setEditingAddressId(null);
      }
    } catch (error) {
      // Address update failed
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

  const handleDeleteAddress = async () => {
    // Convert address string to number for comparison
    const addressId = parseInt(address, 10);

    // Check if addressId is valid
    if (isNaN(addressId) || addressId <= 0) {
      return;
    }

    // Don't allow deletion if there's only one address
    if (addresses.length <= 1) {
      return;
    }

    // Find the address to delete
    const addressToDelete = addresses.find(
      (addr) => addr.id === addressId || addr.value === addressId,
    );

    if (!addressToDelete) {
      return;
    }

    try {
      const response = await deleteAddress(addressToDelete.id);

      if (isHttpSuccessResponse(response)) {
        // Remove the address from the addresses array
        const updatedAddresses = addresses.filter(
          (addr) => addr.id !== addressToDelete.id,
        );
        setAddresses(updatedAddresses);

        // If the deleted address was selected, reset or select the first remaining address
        if (address === addressId.toString()) {
          if (updatedAddresses.length > 0) {
            setAddress(updatedAddresses[0].id.toString(), 0);
          } else {
            setAddress("", null);
          }
        }

        // Clean any scheduling data tied to the deleted address
        cleanStaleAddressData();
      }
    } catch (error) {
      // Error deleting address - could show error message here
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
    const selectedAddressId = Number.parseInt(address, 10);
    const requiresAddress =
      type === OfferTypes.restaurant ||
      type === OfferTypes.activity ||
      type === OfferTypes.lodging;

    if (
      requiresAddress &&
      (!Number.isInteger(selectedAddressId) || selectedAddressId <= 0)
    ) {
      setScheduleError("Debes seleccionar una direccion antes de guardar.");
      return;
    }

    setScheduleError("");
    const sanitizeWeek = (weekData: unknown): WeekScheduleDay[] => {
      if (!Array.isArray(weekData)) {
        return [];
      }

      return weekData
        .map((day) => {
          const timeSlots = Array.isArray(
            (day as { time_slot?: unknown }).time_slot,
          )
            ? (
                day as {
                  time_slot: Array<{ from_time?: string; to_time?: string }>;
                }
              ).time_slot
            : [];
          const validTimeSlots = timeSlots.filter(
            (slot): slot is WeekScheduleSlot =>
              typeof slot?.from_time === "string" &&
              slot.from_time.length > 0 &&
              typeof slot?.to_time === "string" &&
              slot.to_time.length > 0,
          );

          return {
            ...(day as WeekScheduleDay),
            time_slot: validTimeSlots,
          };
        })
        .filter(
          (day) =>
            Array.isArray((day as { time_slot?: unknown }).time_slot) &&
            (day as { time_slot: unknown[] }).time_slot.length > 0,
        );
    };
    const cleanedWeek = sanitizeWeek(week);

    switch (type) {
      case OfferTypes.restaurant: {
        const key =
          offer?.type.toLocaleLowerCase() as keyof typeof schedulingState;

        const newOfferableRestaurant: OfferableRestaurant = {
          address_id: selectedAddressId,
          min_guests: +getFieldProps("min_guests").value,
          max_guests: +getFieldProps("max_guests").value || 0,
          week: cleanedWeek as unknown as WeekDay[][],
          advance_notice_time: +getFieldProps("advance_notice_time").value || 0,
        };

        const indexByAddress = schedulingState.restaurant.findIndex(
          (item) => item.address_id === selectedAddressId,
        );
        const nextRestaurant =
          indexByAddress !== -1
            ? schedulingState.restaurant.map((item, idx) =>
                idx === indexByAddress ? newOfferableRestaurant : item,
              )
            : [...schedulingState.restaurant, newOfferableRestaurant];
        updatedSchedulingState[key] = nextRestaurant as never;
        console.log("[OffersScheduling] restaurant upsert", {
          selectedAddressId,
          cleanedWeek,
          nextOfferables: updatedSchedulingState[key],
        });

        handleScheduling(
          "restaurant",
          updatedSchedulingState[key] as OfferableRestaurant[],
        );
        break;
      }

      case OfferTypes.lodging: {
        const newOfferableLodging: OfferableLodging = {
          address_id: selectedAddressId,
          min_guests: +getFieldProps("min_guests").value || 0,
          max_guests: +getFieldProps("max_guests").value || 0,
        };

        const indexByAddress = schedulingState.lodging.findIndex(
          (item) => item.address_id === selectedAddressId,
        );
        updatedSchedulingState.lodging =
          indexByAddress !== -1
            ? schedulingState.lodging.map((item, idx) =>
                idx === indexByAddress ? newOfferableLodging : item,
              )
            : [...schedulingState.lodging, newOfferableLodging];

        handleScheduling("lodging", updatedSchedulingState.lodging);
        break;
      }

      case OfferTypes.activity: {
        const newOfferableActivity: OfferableActivity = {
          address_id: selectedAddressId,
          min_guests: +getFieldProps("min_guests").value || 0,
          max_guests: +getFieldProps("max_guests").value || 0,
          week: cleanedWeek as unknown as WeekDay[][],
          advance_notice_time: +getFieldProps("advance_notice_time").value || 0,
        };

        const indexByAddress = schedulingState.activity.findIndex(
          (item) => item.address_id === selectedAddressId,
        );
        updatedSchedulingState.activity =
          indexByAddress !== -1
            ? schedulingState.activity.map((item, idx) =>
                idx === indexByAddress ? newOfferableActivity : item,
              )
            : [...schedulingState.activity, newOfferableActivity];
        console.log("[OffersScheduling] activity upsert", {
          selectedAddressId,
          cleanedWeek,
          nextOfferables: updatedSchedulingState.activity,
        });

        handleScheduling("activity", updatedSchedulingState.activity);
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

    setScheduleSaved(true);
    setShowScheduleToast(true);
    window.setTimeout(() => {
      setShowScheduleToast(false);
    }, 2500);
  };

  const getIndexAddress = (addressId: number) => {
    const index = addresses.findIndex((address) => address.id === addressId);
    return index !== -1 ? index : null;
  };

  const addressOptions = addresses.map((item) => ({
    ...item,
    value: String(item.id),
  }));

  return (
    <OfferSchedulingStyled className="scheduling">
      {showScheduleToast ? (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            background: "#335d53",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "8px",
            zIndex: 2000,
            fontWeight: 600,
          }}
        >
          Horario guardado correctamente
        </div>
      ) : null}

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
              options={addressOptions}
              setValue={(value) => {
                const parsedAddressId = Number.parseInt(value, 10);
                const nextIndex = Number.isInteger(parsedAddressId)
                  ? getIndexAddress(parsedAddressId)
                  : null;
                setAddress(value, nextIndex);
                setScheduleError("");
              }}
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
            {addresses.length > 1 && (
              <button
                type="button"
                className="datasheet-form__delete-address"
                onClick={handleDeleteAddress}
                disabled={!address || addresses.length === 0}
              >
                <FaTrashAlt className="datasheet-form__create--icon" />
                Eliminar dirección
              </button>
            )}
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
                  ).min_guests ?? 0
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
                  ).max_guests ?? 0
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
      {(type === OfferTypes.restaurant || type === OfferTypes.activity) && (
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
            aria-label="Tiempo previo de aviso"
            {...getFieldProps("advance_notice_time")}
          />
          {(errors as OfferableRestaurant | OfferableActivity)
            .advance_notice_time &&
            (touched as OfferableRestaurant | OfferableActivity)
              .advance_notice_time && (
              <ErrorMessage
                className="form-subsection__error-message"
                component="span"
                name="advance_notice_time"
              />
            )}
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
            disabled={
              (type === OfferTypes.restaurant ||
                type === OfferTypes.activity ||
                type === OfferTypes.lodging) &&
              (!address || Number.parseInt(address, 10) <= 0)
            }
          >
            Guardar horario
          </button>
        ) : null}
      </div>
      {scheduleSaved ? (
        <p style={{ color: "#666", marginTop: "8px", textAlign: "right" }}>
          Horario modificado. Recuerda guardar la oferta para aplicar los
          cambios
        </p>
      ) : null}
      {scheduleError ? (
        <span className="form-subsection__error-message">{scheduleError}</span>
      ) : null}

      <ReusableModal
        children={
          <AddressForm
            // @ts-expect-error TODO: fix this
            address={isEditMode ? getAddressDataForEdit() : {}}
            // @ts-expect-error TODO: fix this
            setAddress={isEditMode ? handleUpdateAddress : handleCreateAddress}
            setIsModalOpen={handleModalClose}
            isEditMode={isEditMode}
            editingAddressId={editingAddressId}
            updateAddress={handleUpdateAddress}
          />
        }
        openModal={isAddressModalOpen}
        setIsModalOpen={handleModalClose}
      />
    </OfferSchedulingStyled>
  );
};

export default OffersScheduling;
