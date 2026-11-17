import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { ThemeProvider } from "styled-components";
import { vi } from "vitest";
import theme from "assets/styles/theme";
import { OfferTypes, SelectedDay, WeekDay } from "modules/offers/domain/Offer";
import { AddressContext } from "sections/address/AddressContext/AddressContext";
import OffersScheduling from "./OffersScheduling";
import { Addresses } from "../OffersForm/OffersForm";

vi.mock("../OffersTimetable/OffersTimetable", () => ({
  default: () => null,
}));

vi.mock("sections/shared/components/ReusableModal/ReusableModal", () => ({
  default: () => null,
}));

const FISCAL_ADDRESS_ID = 10;
const OTHER_ADDRESS_ID = 20;

const deleteAddress = vi.fn();

const schedulingState = {
  restaurant: [],
  delivery: {} as never,
  activity: [],
  brand: {},
  lodging: [],
};

const OffersSchedulingHarness = ({
  initialAddress,
  fiscalAddressId,
}: {
  initialAddress: string;
  fiscalAddressId: number | null;
}) => {
  const [addresses, setAddresses] = useState<Addresses[]>([
    { id: FISCAL_ADDRESS_ID, name: "Fiscal Centro", value: FISCAL_ADDRESS_ID },
    { id: OTHER_ADDRESS_ID, name: "Local Norte", value: OTHER_ADDRESS_ID },
  ]);
  const [address, setAddress] = useState(initialAddress);
  const [, setSelectedDays] = useState<SelectedDay[]>([]);
  const [, setWeek] = useState<WeekDay[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <AddressContext.Provider
        value={
          {
            loading: false,
            address: {},
            getAddress: vi.fn(),
            createNewAddress: vi.fn(),
            updateAddress: vi.fn(),
            deleteAddress,
          } as never
        }
      >
        <Formik
          initialValues={{
            min_guests: 0,
            max_guests: 0,
            advance_notice_time: 0,
          }}
          onSubmit={vi.fn()}
        >
          {({ errors, touched, getFieldProps }) => (
            <OffersScheduling
              type={OfferTypes.restaurant}
              errors={errors as never}
              touched={touched as never}
              getFieldProps={getFieldProps}
              company={{} as never}
              address={address}
              setAddress={(value) => setAddress(value)}
              handleScheduling={vi.fn()}
              schedulingState={schedulingState}
              selectedDays={[]}
              week={[]}
              setSelectedDays={setSelectedDays}
              setWeek={setWeek}
              offer={{ type: OfferTypes.restaurant, images: [] } as never}
              addresses={addresses}
              setAddresses={setAddresses}
              fiscalAddressId={fiscalAddressId}
            />
          )}
        </Formik>
      </AddressContext.Provider>
    </ThemeProvider>
  );
};

describe("Given the OffersScheduling component", () => {
  beforeEach(() => {
    deleteAddress.mockReset();
  });

  describe("When the user removes an address from the offer", () => {
    test("Then it does not call deleteAddress and drops that address from the list", async () => {
      render(
        <OffersSchedulingHarness
          initialAddress={String(OTHER_ADDRESS_ID)}
          fiscalAddressId={FISCAL_ADDRESS_ID}
        />,
      );

      await userEvent.click(
        screen.getByRole("button", { name: "Quitar de la oferta" }),
      );

      expect(deleteAddress).not.toHaveBeenCalled();
      expect(
        screen.queryByRole("button", { name: "Quitar de la oferta" }),
      ).not.toBeInTheDocument();

      await userEvent.click(
        screen.getByRole("combobox", { name: "Direcciones" }),
      );
      const listbox = await screen.findByRole("listbox");

      expect(
        within(listbox).queryByRole("option", { name: "Local Norte" }),
      ).not.toBeInTheDocument();
      expect(
        within(listbox).getByRole("option", { name: "Fiscal Centro" }),
      ).toBeInTheDocument();
    });
  });

  describe("When the selected address is the company fiscal address", () => {
    test("Then Editar dirección is disabled", () => {
      render(
        <OffersSchedulingHarness
          initialAddress={String(FISCAL_ADDRESS_ID)}
          fiscalAddressId={FISCAL_ADDRESS_ID}
        />,
      );

      const editButton = screen.getByRole("button", {
        name: "Editar dirección",
      });

      expect(editButton).toBeDisabled();
      expect(editButton).toHaveAttribute(
        "title",
        "Es la dirección fiscal del cliente; edítala desde la ficha del cliente.",
      );
    });
  });
});
